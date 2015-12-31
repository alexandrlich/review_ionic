'use strict';
//this is a landing page after login or if your session is still stored and active
angular.module('reviyouMobileApp')
    .controller('MainCtrl', ["$rootScope",  "$state","notificationsProvider","User",function ($rootScope, $state,notificationsProvider,User) {
    		//if there is no internet - go to the login page
			if (navigator && navigator.network && navigator.network.connection.type == Connection.NONE) {
				$rootScope.$broadcast('errorAlert',"Warning!","You have no internet connection, please try again later.");
				 //we have to navigate somewhere for the user, login page is a safe bet
				 $state.go('blank.login');

			} else {
				//recalculate notifications every time when we open app(we also do it at login)
				notificationsProvider.checkRecentNotificationsCount(function(response) {
				    User.setNotificationsCount(response.newNotificationsCount);
			    });			
				$state.go('tabs.popular');

            }
            
            /* use http://forum.ionicframework.com/t/how-to-use-platform-ios-and-platform-cordova-css-classes/5898 isntead
            $rootScope.deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "ipad" : 
            	(navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iphone" : 
            		(navigator.userAgent.match(/iPod/i))  == "iPod" ? "ipod" : 
						(navigator.userAgent.match(/Android/i)) == "Android" ? "android" : 
            				(navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "blackBerry" : "null"; // detecting device
            				
            				*/
	
	
      
    }]);
