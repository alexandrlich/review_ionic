'use strict';

angular.module('reviyouMobileApp')
    .factory('AuthorizationService', ["$state", "$timeout","$rootScope", "defaultProvider", "User", "appConfig", "deviceInfo", "GoogleAuth", "FacebookAuth", "twitterAuth","reviyouAuth", "$log","spinner", "$ionicHistory","notificationsProvider", function ($state, $timeout,$rootScope, defaultProvider, User, appConfig, deviceInfo, GoogleAuth, FacebookAuth, twitterAuth, reviyouAuth,$log,spinner, $ionicHistory,notificationsProvider) {

        function onAfterLoginNavigate() {
            var path = 'tabs.popular';
			if (!User.getUserValue('terms_signed')) {
                path = 'tabs.signterms';//TODO: change
            }
            spinner.hide();
            
            
            //clear ionic cache just in case
            $ionicHistory.clearCache();
			
			//store only 20digits of the original token
            //same code applied on the backend in LoginRequest.scala    
            if(User.getAuthToken().length>20) {
            	User.setAuthToken(User.getAuthToken().substring(0,20));
            }
            //$log.log('token current:'+ User.getAuthToken());
		    //save in local storage
		    User.saveUserInStorage();
			//recalculate notifications every time when we login(we also do every time when we open app in main ctrl)			
			notificationsProvider.checkRecentNotificationsCount(function(response) {
			    User.setNotificationsCount(response.newNotificationsCount);
		    });
				
			$state.go(path);
        }

		//comes from the backend after login
        function successLoginHandler (data) {
            $log.debug('successLoginHandler');
            User.setUserId(data.userId);//userId in our system
            if(data.tags==null) data.tags=[];
            
            User.setUserData({
                terms_signed: data.terms_signed,
                user_image_url: data.user_image_url,
                tags: data.tags,
                settings:data.settings
            });
            if(typeof(analytics) != 'undefined') analytics.setUserId(data.userId);//set analytics userId:
 
        }

        function serverLogin(parameters) {
            var metaDataType = parameters.loginProvider + '_login_metadata',
                loginData = {
                    login_provider: parameters.loginProvider,
                    device: deviceInfo.getDeviceInfo(),
                    /*General user data*/
                    email: parameters.data.email,
                    first_name: parameters.data.first_name,
                    last_name: parameters.data.last_name,
                    gender: parameters.data.gender,
                    access_token: parameters.data.access_token
                };

            loginData[metaDataType] = parameters
                .data[metaDataType];

            defaultProvider.create('/login', {
                body: loginData,
                withoutAuthData: true,
                success: function (data) {
                    successLoginHandler(data);
                    parameters.callback(data);

                    $timeout(function () {
                        onAfterLoginNavigate();
                    });
                }
            });
        }

        var _loginProviders = {
                facebook: FacebookAuth,
                google: GoogleAuth,
                twitter: twitterAuth,
                reviyou: reviyouAuth

            }
     
        return {
          
            login: function (providerName, signUpObj) {
            	 //since it's a separate window - it's not tracked by error-interceptor, 
			     //so adding internet check here too   
				if (navigator && navigator.network &&  navigator.network.connection) {//check fro serve web command
					if (navigator.network.connection.type == Connection.NONE) {
					    $rootScope.$broadcast('errorAlert',"Warning!","You have no internet connection, please try again later.");
					    return;
					}
				}
				    	
                var provider = _loginProviders[providerName];
                if(typeof(analytics) != 'undefined') analytics.trackEvent('Category1', 'Login', providerName);
				
                if(typeof(spinner) != 'undefined') spinner.show();
				provider.login(serverLogin,signUpObj);
            }
                        
        };
    }]);
