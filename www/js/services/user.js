'use strict';

angular.module('reviyouMobileApp')
    .factory('User', ["$log",function ($log) {
    //confirm('tsere');
    	var userDataInitial = {
                isLoggedIn: false,
                token: null,
                userId: null,
                notificationsCount: 0,
                userData: {
                    showname: '',
					terms_signed: false,
                    user_image_url: '',
                    login_provider: '', //could be twitter\facebook\gmail
                    email: null, //exist for facebook\google only
                    tags: [],
                    settings: {
	                    appSounds:true,//on by default,match db field
	                    followOnComment:false//off by default, match db field
                    }
                    
                }
            }, user;
        	
			var userStr = window.localStorage.getItem('reviyou_login');
			if ((userStr === undefined) ||(userStr == null) || (userStr == "undefined")) {
				user = angular.copy(userDataInitial);
		} else {
				user = JSON.parse(userStr);
				//if timestamp(when user logged in last time) is more than 7days old
				// - don't consider user is still logged in so that he'll need to relogin
				var currentTs = new Date().getTime();
				var tokenTs = user.timestamp + 1000*60*60*24*7;
				if(currentTs >tokenTs) {
					user.isLoggedIn =false;
				} 	
			}
			
		  	//====================
      	
            function getAuthToken () {
                return user.token;
            }

            function setUserId (userId) {
                user.userId = userId;
            }

            function getUserId () {
                return user.userId;
            }
            
			//logout
            function clearUserData () {
            	$log.log('clearUserData');
                user = angular.copy(userDataInitial);
                window.localStorage.removeItem( 'reviyou_login' );
                //localStorage.clear(): 
            }   
            
            //since data stays on mobile device after app session closes
            function persistToSession() {
	            user.timestamp = new Date().getTime();
				$log.log('user save to  storage: ' + JSON.stringify(user));
				localStorage.setItem( 'reviyou_login', JSON.stringify(user));
            } 
            
            
            //to support old session of the users we need to check for undefined
            //TODO: remove once new API is released and once we deprecate older versions prior to 1.3.0
            function checkDefaultSettings() {
	          	if ((user.settings  === undefined) ||(user.settings  == null) || (user.settings  == "undefined")) {
					user.settings = {
						ppSounds:true,
						followOnComment:false
					}
				} 
            }

        return {
            getAuthToken: getAuthToken,
            setUserId: setUserId,
            getUserId: getUserId,
            clearUserData: clearUserData,
			getNotificationsCount: function() {
				return user.notificationsCount;
			},
			setNotificationsCount: function(val) {
				user.notificationsCount = val;	
			},
			decrNotificationsCount: function() {
				if(user.notificationsCount>0) user.notificationsCount--;
			},

            setLoginStatus: function (val) {
                user.isLoggedIn = val;
                return this;
            },             
            getLoginStatus: function () {
                return user.isLoggedIn;
            },
            setSoundsEnabledOption: function (isEnabled) {
                user.settings.appSounds = isEnabled;
                persistToSession(); 
            },
            getSoundsEnabledOption: function () {

				checkDefaultSettings();
            	
                return user.settings.appSounds;
            },
            setFollowOnCommentOption: function (newVal) {
                user.settings.followOnComment = newVal;
                persistToSession(); 
            },
            
            getFollowOnCommentOption: function () {

            	checkDefaultSettings();
                return user.settings.followOnComment;
            },
			setUserData: function (data) {
                angular.forEach(data, function (value, key) {
                //makes sure it only stores specific set of fields(defined in userDataInitial)
                    if(user.userData.hasOwnProperty(key)){
                    	this[key] = value;
                    } 
                }, user.userData);
                
               
                return this;
            },
            addTag: function(tag_name) {
            	for (var i = 0; i < user.userData.tags.length; i++) {
	                    if (user.userData.tags[i] === tag_name) {
	                        return;
	                    }
	             }
	             user.userData.tags.push(tag_name);	
	             persistToSession();            
            },
            removeTag: function(tag_name) {
	            for (var i = 0; i < user.userData.tags.length; i++) {
	                    if (user.userData.tags[i] === tag_name) {
	                        user.userData.tags.splice(i, 1);
							break;
	                    }
	             }
	             persistToSession();
            },
            getSelectedTags: function() {
            	if ((user.userData.tags === undefined) || (user.userData.tags == "undefined")) user.userData.tags = [];
				return user.userData.tags;
            },
            saveUserInStorage: function() {
            	persistToSession();
            },

            getUserData: function () {
                return user.userData;
            },

            getUserValue: function (value) {
                return user.userData[value];
            },

            setAuthToken: function (token) {
                user.token = token;
                
            },
            
            setLoginProvider: function(loginProvider) {
	            user.userData.login_provider = loginProvider
            }
        };
    }]);
