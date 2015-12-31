'use strict';

/*
	configure to use backend or fe mock services and initialize oauthui for twitter integration.
*/

angular.module('reviyouMobileApp')
    .factory('pushNotificationsProvider',["$log","defaultProvider","deviceInfo","utils","appConfig",function ($log,defaultProvider,deviceInfo,utils,appConfig) {


		function successHandler (result) {
			$log.debug('notification registration successhandler ' + result);

        }
		function tokenHandler (result) {//ios
		
			//alert("device.uuid" + device.uuid+ ' tokenHandler ' + result);
            // Your iOS push server needs to know the token before it can push to this device
            // here is where you might want to send it the token for later use.
            	var urlRoot = '/pushNotification/register/';
				var data = deviceInfo.getDeviceInfo();
				data.notification_token =  result;
				$log.debug('data to send: ' + JSON.stringify(data));
               		
               defaultProvider.create(urlRoot, {
                    body: data,
                    success: function() {$log.debug('push token saved');},
                    error: function() {$log.error('push token not saved');} //return the same callback no matter what
                });
        }

       function errorHandler (error) {
       		$log.error('notification registration error, errorHandler' + error);
       }		
		
		 return {
                        
             onNotificationAndroid:function(e) {
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
                        var data = deviceInfo.getDeviceInfo();
                        data.notification_token = e.regid;
					    defaultProvider.create('/pushNotification/register/', {body: data,
                            success: function() {$log.debug('android push token saved')},
                            error: function(){$log.error('failed to save push token')}
                        });	
						//TODO: see tokenHandler in push-notification.js for ios. We need the same here for android.
						//e.regid for android == deviceToken for ios stored in mongo
						$log.debug("regID = " + e.regid);
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							utils.playMedia(e.soundname);
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							//if (e.coldstart)
								//console.log('test1')
							//else
							//	console.log('test2')
						}
							
						//console.log('payload message: ' + e.payload.message);
						//console.log('payload message2: ' + e.payload.msgcnt);
                    break;
                    
                    case 'error':
	                    $log.error('error during android push notification received: ' + e.msg);
                    break;
                    
                    default:
                    	$log.error('unexpected error during android push notification received');
						
                    break;
                }
            },
             					 
            init: function () {
				try {
				   	var pushNotification  = window.plugins.pushNotification;
				   	$log.debug("pushNotification "  + pushNotification);
		            if (device.platform == 'android' || device.platform == 'Android' ) {
						var config = appConfig.getAppConfig().googleParams
						pushNotification.register(successHandler, errorHandler, {"senderID":config.project_id,"ecb":"onNotificationAndroid"});		// required!
					    $log.debug("pushNotification android registered");	
						
					} else {
		                pushNotification.register(tokenHandler, errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
		                //$log.debug("notification registered for ios "  + device.platform);
		            }
		           } catch(err)  { 
						$log.error("push notification initialization error: " + err.message); 
				   } 
            }	

        };

		
		
					
		   
    }]);
