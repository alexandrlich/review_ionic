'use strict';

angular.module('reviyouMobileApp')
    .factory('GoogleAuth', ["$http", "appConfig", "User", "defaultProvider", "$log","spinner",function ($http, appConfig, User, defaultProvider, $log,spinner) {

	

        function generateAuthUrl(options) {
            //$log.log("b11 generateAuthUrl"+JSON.stringify(options)); 
                
            return GOOGLE_AUTH_URLS['auth'] + $.param({
                client_id: options.client_id,
                redirect_uri: options.redirect_uri,
                response_type: 'code',
                scope: options.scope
            })
        }
		
			/*
			get auth token using auth code
		*/
        function requestToken(deferred, code, options) {
			
            $.post(GOOGLE_AUTH_URLS['token'], {
                code: code[1],
                client_id: options.client_id,
                client_secret: options.client_secret,
                redirect_uri: options.redirect_uri,
                grant_type: 'authorization_code'
            }).done(function (data) {
                 //saveToken(data);
                // User.setAuthToken(data.access_token);
                deferred.resolve(data);
            }).fail(function (response) {
                $log.error("error obtaining auth token"+JSON.stringify(response.responseJSON)); 
                spinner.hide();
                deferred.reject(response.responseJSON);
            });
        }

		/*
			error during obtaining auth code
		*/
        function authCodeError(deferred, error) {
        	$log.error("authCodeError"+JSON.stringify(error)); 
    
            deferred.reject({
                error: error[1]
            });
        }

        var GOOGLE_AUTH_URLS = {
                auth: 'https://accounts.google.com/o/oauth2/auth?',
                token: 'https://accounts.google.com/o/oauth2/token',
                peopleget: 'https://www.googleapis.com/plus/v1/people/me?callback=JSON_CALLBACK&access_token='
            },
            CODE_REG_EXP = /\?code=(.+)$/,
            ERROR_REG_EXP = /\?error=(.+)$/;

        function authorize(options) {
            var deferred = $.Deferred(),
                authUrl = generateAuthUrl(options),
                authWindow = window.open(authUrl, '_blank',
                    'location=no,toolbar=no');     
			
            $(authWindow).on('loadstart', function (event) {
				//spinnerplugin.hide();
		
                var url = event.originalEvent.url,
                    code = CODE_REG_EXP.exec(url),
                    error = ERROR_REG_EXP.exec(url);

                if (code || error) {
                    authWindow.close();
                }

                if (code) {//auth code received
            		requestToken(deferred, code, options);
                } else if (error) {
                    $log.error("error"+error); 
					authCodeError(deferred, error);
                }
            });

            return deferred.promise();
        }

        function onAfterSuccessBackendLogin(user) {
        	$log.debug('gg:onAfterSuccessBackendLogin');
            
            return function () {

                User.setLoginStatus(true);
				User.setUserData(user);
                User.setLoginProvider("google");
                User.setUserData({
		                showname: user.name.givenName + ' ' + user.name.familyName,
		                email: user.emails[0].value
		        });
	        }
        }


        /* example of loginData object from google
   example of the user json from google:
            
            user: {"kind":"plus#person","etag":"\"L2Xbn8bDuSErT6QA3PEQiwYKQxM/6e1aMgab_fqEsGGdLGqoFJiSVuc\"","gender":"male","emails":[{"value":"sashany12@gmail.com","type":"account"}],"objectType":"person","id":"116139777093147110354","displayName":"sash l","name":{"familyName":"l","givenName":"sash"},"image":{"url": https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50","isDefault":true},"isPlusUser':false,"language":"en","verified":false}
        */
        function onSuccessLogin(serverLogin, loginData) {

            //$log.log("onSuccessLogin: "+JSON.stringify(loginData)); 
                 
            return function (user) {
               //$log.log("user: "+JSON.stringify(user)); 
                    	
                angular.extend(loginData, {
                    email: user.emails[0].value,
                    
                    first_name: user.name.givenName,
                    last_name: user.name.familyName,
                    gender: user.gender
                    });

                angular.extend(loginData.google_login_metadata, {
                    googleUserId: user.id,
                    image_url: user.image.url,
                    is_default_image : user.image.isDefault
 
                });
			  
                serverLogin({
                    loginProvider: 'google',
                    data: loginData,
                    callback: onAfterSuccessBackendLogin(user)
                });
            }
        }

        return {
            login: function (serverLogin) {
            	 if(typeof(spinnerplugin) != 'undefined') spinner.show('Signing in using Goolge+...');
		        
                var config = appConfig.getAppConfig().googleParams,
                    loginData = {
                        google_login_metadata: {}
                    };

                authorize({
                    client_id: config.client_id,
                    client_secret: config.client_secret,
                    redirect_uri: config.redirect_uri,
                    scope: config.scope
                }).done(function (data) {
						$log.log('authorized, response: ' + data);
                        angular.extend(loginData, {
                            access_token: data.access_token
                        }); 
						User.setAuthToken(data.access_token);
			
                        angular.extend(loginData.google_login_metadata, {
                            googleUserId: data.googleUserId,
                            expiresIn: data.expires_in,//google espiresIn, not ours
                            idToken: data.id_token,
                            refreshToken: data.refresh_token,
                            tokenType: data.token_type
                        });
						 
							$http({method: 'JSONP', url: GOOGLE_AUTH_URLS['peopleget']+data.access_token}).success(onSuccessLogin(serverLogin, loginData) 

							);        
       

                    }).fail(function () {
                    	//USER DIDN't ALLOW to share his info- handle navigation back to login page!
                        $log.error("google login failed"); 
    
                        spinner.hide();
                        if(typeof(analytics) != 'undefined') analytics.trackEvent('Category1', 'LoginCancel', 'google');
				
	
                    });
            }
        };
    }]);//module end
