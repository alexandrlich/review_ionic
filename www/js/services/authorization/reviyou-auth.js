'use strict';

angular.module('reviyouMobileApp')
    .factory('reviyouAuth',["appConfig", "defaultProvider","User", "$log","spinner","utils", function (appConfig, defaultProvider, User, $log,spinner, utils) {
        function onAfterSuccessBackendLogin(data) {
        	$log.debug('reviyou:onAfterSuccessBackendLogin');
            
            return function () {
                User.setLoginStatus(true);
                User.setAuthToken(data.auth_token);
                User.setLoginProvider("reviyou");
		        User.setUserData(data);
                User.setUserData({
		                showname: data.first_name + ' ' + data.last_name,
						email: data.email
		        });
		       
            };
        }

        return {
            login: function (serverLogin,signInObj) {
		        
                var loginData = {
                    reviyou_login_metadata: {}
                };
                //make db call
                angular.extend(signInObj, {
                     reviyouAppId: utils.getReviyouAppKey()                   
                                });
                
                defaultProvider.create('/account/getToken', {
		                body: signInObj,
		                withoutAuthData: true,
		                success: function (response) {
		                    	angular.extend(loginData, {
                                    access_token: response.auth_token,
                                    first_name: response.first_name,
                                    last_name: response.last_name,
                                    email: response.email,
                                    gender: "unknown" //TODO: add 3rd party call to identify gender by name
                                    
                                });
								
								signInObj.password='';//hide from the ui after the call;
								
								serverLogin({
                                    loginProvider: 'reviyou',
                                    data: loginData,
                                    callback: onAfterSuccessBackendLogin(response)
                                });
                   
		                }
					});
				}                        
           };//end of retutn
    }]);
