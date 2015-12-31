'use strict';

angular.module('reviyouMobileApp')
    .factory('twitterAuth',["appConfig", "User", "$log","spinner", function (appConfig, User, $log,spinner) {
        function onAfterSuccessBackendLogin(response, user) {
        $log.debug('twtr:onAfterSuccessBackendLogin');
            
            return function () {
                User.setLoginStatus(true);
                User.setUserData(user);
                User.setAuthToken(response.oauth_token);
                User.setLoginProvider("twitter");
                User.setUserData({
		                showname: user.name
		        });
		       
            };
        }

        return {
            login: function (serverLogin) {
		//can't show it since there is no way to hide it on twitter's page            	
		//spinnerplugin.show();
		        
                var loginData = {
                    twitter_login_metadata: {}
                };
                   
                OAuth.popup('twitter')
                    .done(function (response) {
                    //https://dev.twitter.com/rest/reference/get/account/verify_credentials
                        response.get("/1.1/account/verify_credentials.json") // why not use API /me ?
                            .done(function (data) {
                        
                                var nameArray = data.name.split(" ");//john smith
                                angular.extend(loginData, {
                                    access_token: response.oauth_token,
                                    first_name: nameArray[0],
                                    last_name: nameArray[1] || " ",
                                    email: data.id + "@twitter.com",
                                    gender: "unknown" //TODO: add 3rd party call to identify gender by name
                                    
                                });
                                angular.extend(loginData.twitter_login_metadata, {
                                    twUserId: ""+data.id, //pass it as a string
                                    username: data.screen_name,
                                    is_default_image: data.default_profile_image,
                                    image_url : data.profile_image_url
                                });

                                serverLogin({
                                    loginProvider: 'twitter',
                                    data: loginData,
                                    callback: onAfterSuccessBackendLogin(response,data)
                                });
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                $log.error('ry exception: '+arguments);
                                 //TODO: handle exception flow here
                                 spinner.hide();
                            });
                    })
                    .fail(function (e) {
                        spinner.hide();
                        if(typeof(analytics) != 'undefined') analytics.trackEvent('Category1', 'LoginCancel', 'twitter');
				
		            });
            }
        };
    }]);
