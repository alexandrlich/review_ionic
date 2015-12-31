'use strict';

angular.module('reviyouMobileApp')
    .factory('utils', ["appConfig",'$log',"$ionicScrollDelegate", "$timeout","User",function (appConfig, $log,$ionicScrollDelegate, $timeout,User) {
        var config = appConfig.getAppConfig(),
        	apiHost = config.apiHost;

        return {
            apiUrl: function (url) {
                return apiHost + url;
            },
            playMedia: function(filename) {
            	if(User.getSoundsEnabledOption()==true) {//if sounds are enabled for the app
		        	if(typeof(Media) != 'undefined') {//for ionic serve
					   var snd = new Media(filename);
					   snd.play();
					}
				}
            },
            
            /*
            //get first character of each word
            nameInitials: function(name) {
				var matches = name.match(/\b(\w)/g); 
				var initials =  matches.join(''); 
				if(initials.length>1) {
					var res = initials.substring(0, 2);//only first two
					return res;
					
				} else {
					return initials;
				}
            },*/

            checkRequired: function () {
	            if ((angular.isUndefined(cordova)) && (angular.isUndefined(Cordova))) {
	                console.error('Cordova variable does not exist. Check that you have ' +
	                    'included cordova.js correctly');
	            }
	            if (angular.isUndefined(device)) {
	                console.error('device variable does not exist. Check that you have ' +
	                    'included org.apache.cordova.device correctly');
	            }
	            if (angular.isUndefined(facebookConnectPlugin)) {
	                console.error('facebookConnectPlugin variable does not exist. Check that you have ' +
	                    'included the Facebookconnect plugin.');
	            }

	        },

            getOAuthIOPublicKey: function () {
                return config.oAuthIOPublicKey;
            },
            getAnalyticsKey: function() {
	            return config.analyticsKey;
            },
             getAnalyticsDebugMode: function() {
	            return config.analyticsDebugMode;
            },  
            getReviyouAppKey: function () {
                return config.ryAppId;
            },
            isHttpFake: function () {
                return config.isHttpFake;
            },

            dateFormat: function (date) {
                return !angular.isString(date) && Date.parse(date);
            },
            validateEmail: function(email){
				var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
				if (filter.test(email))
					return true;
				else
					return false;
			},
			validatePassword:function(password) {
			 	// at least one number, one lowercase and one uppercase letter
			 	// at least six characters
			 	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
			 	return re.test(password);
			}, 
			
			resizeScroll: function() {
				      $timeout(function() {
				       $ionicScrollDelegate.resize();
				    }, 1);
			},
             
             
             //TODO:doesn't work, refactor!
           convertInputDateToString: function(date) {
	         if(date) {
				$log.debug(date);
				var split_date = date.split(/\/|-|[.]/);
				var parsedDate;
				
				
				
				if(split_date[1].length > split_date[0].length) {
                    parsedDate = Date.parse(split_date[1] + '-' + split_date[0]);
                } else {
                    parsedDate = Date.parse(split_date);
                }
                //new
                //parsedDate = Date.parse(date);
                
                var resultDate = parsedDate.toString();
                $log.debug(resultDate);
                return resultDate;
			}
           }  
             
        };
    }]);
