'use strict';
//test1
angular.module('reviyouMobileApp')
    .factory('FacebookAuth',["appConfig", "User", "$log", "spinner", function (appConfig, User, $log, spinner) {
        function getMe(cb) {
                    	
            //from https://developers.facebook.com/docs/graph-api/reference/v2.1/user
            //no need to ask for email permissions again, ["email"]
              facebookConnectPlugin.api( "me/?fields=id,email,first_name,last_name,gender",[] ,
                   function (getMeResponse) { 
                    	//$log.debug("getme response"+ JSON.stringify(getMeResponse)); 
                   		getMyPicture(cb, getMeResponse);
                   }, function (response) { 
                    	$log.error("error"+JSON.stringify(response)); 
                    	//TODO: handle the exception
                    }); 
                 
               
                    
                   
        };
        
        	/*
        	getting image url from facebook:
        	https://developers.facebook.com/docs/graph-api/reference/v2.1/user/picture
        	data:{"is_silhouette":false, - default or not
        	"url":"imagefullpath",
        	"width":200,
        	"height":200}
        	*/
           function getMyPicture(cb,getMeResponse) {
		
                 facebookConnectPlugin.api( "me/picture?redirect=0&height=80&type=normal&width=80", [],
                    function (imageResponse) { 
                    	//$log.log("getMeResponse response:"+JSON.stringify(getMeResponse)); 
                    	$log.log("profileResponse response:"+JSON.stringify(imageResponse)); 
                    	
                    	cb(getMeResponse, imageResponse); 
					},
                    function (response) { 
                    	$log.error("error10"+JSON.stringify(response)); 
                    	var imageResponse = {data:
                    		{"is_silhouette":true,
				        	"url":"imagefullpath",//path to default image or somehitng like that
				        	"width":80,
				        	"height":80}};
                    	cb(getMeResponse,imageResponse ); 
                    }); 
                    
            };
			
			
			function succesfulLoginCallback (response, serverLogin) {
                    //$log.debug("a3"+JSON.stringify(response)); 
	                    var res = response.authResponse, loginData;
	                if (res) {
	                	spinner.show('Signing in using Facebook...');
				
	                     getMe(function (userModel, pictureModel) {
	                            var loginData = {
	                                email: userModel.email,
	                                access_token: res.accessToken,
	                                first_name: userModel.first_name,
	                                last_name: userModel.last_name,
	                                gender: userModel.gender,
	                                facebook_login_metadata: {
	                                    expiresIn: res.expiresIn,
	                                    fbUserId: res.userID,
	                                    image_url: pictureModel.data.url,
	                                    is_default_image: pictureModel.data.is_silhouette
	                                }
	                            };
			                     serverLogin({
	                                loginProvider: 'facebook',
	                                data: loginData,
	                                callback: successAuthorizationCallback(response, userModel)
	                            });
	                        });
	                    } else {
	                    	spinner.hide();
				            $log.error.error('User cancelled login or did not fully authorize.');
	                        
	                    }
              };


        function successAuthorizationCallback(response, userModel) {
            $log.debug('fb:successAuthorizationCallback');
                    	
            // closing serverLogin response and model
            return function () {
                User.setLoginStatus(response.status === 'connected');
                User.setAuthToken(response.authResponse.accessToken);
                User.setUserData(userModel);
                User.setLoginProvider("facebook");
		        User.setUserData({
		                showname: userModel.first_name + ' ' + userModel.last_name,
		                email: userModel.email
		        });		       
               
            }
        }

        return {
/*
            checkFbAuthorization: function () {
                var user = {};
                user.id = getMe(function (model) {
                    return model.id;
                });
                
            },
            */
		/*
		preparing for the backend:
		  first_name:String,
		  last_name: String,
		  email: String,
		  login_provider: String,
		  gender: String,
		  access_token: String,
		  device: Option[DeviceLoginData] = None,
		  facebook_login_metadata: Option[FbLoginData] = None,
		
		  case class FbLoginData(username: String, expiresIn: String, fbUserId: String)
		
		  */
            login: function (serverLogin) {
            /*response object
            	https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
              status: 'connected',
			    authResponse: {
			        accessToken: '...',
			        expiresIn:'...',
			        signedRequest:'...',
			        userID:'...'
			    }
              */
  	                 //login with permissions
	                 spinner.hide();
	                 facebookConnectPlugin.login(["email"] ,
	                 function(response){succesfulLoginCallback(response,serverLogin);},
	                 function (response) {
	                 	//TODO: handle the exception, add notification or something
	                 	$log.error('error2 response:'+response);
	                 	spinner.hide();
	                 	if(typeof(analytics) != 'undefined') analytics.trackEvent('Category1', 'LoginCancel', 'facebook');
				
                
	                 }); 

            }

        };//end of return
        
                
    }]);//end of module
