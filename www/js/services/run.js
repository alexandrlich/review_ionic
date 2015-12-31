'use strict';

/*
	configure to use backend or fe mock services and initialize oauthui for twitter integration.
*/
angular.module('reviyouMobileApp')
.run(["$rootScope", "$location", "User", "utils", "$route", "$log", "$state","$ionicPopup","$ionicHistory","spinner","pushNotificationsProvider",function ($rootScope, $location, User, utils, $route, $log, $state,$ionicPopup,$ionicHistory,spinner, pushNotificationsProvider) {
        document.addEventListener("deviceready", function () {
           //utils.checkRequired();
           var twitterKey = utils.getOAuthIOPublicKey();
		    OAuth.initialize(twitterKey);
		    if(typeof(analytics) != 'undefined') {
				analytics.startTrackerWithId(utils.getAnalyticsKey());
				if(utils.getAnalyticsDebugMode()) {
					analytics.debugMode();
				}
				analytics.trackView('index');
			}
			
			
		   //navigator.notification.beep(2);
		   //hide manually splash screen for the smoother transition while app page is loading
		   //navigator.splashscreen.hide();
		   
		  pushNotificationsProvider.init();
			
	    }, false);
	    
		document.addEventListener("backbutton", backButtonF, false);
		
        
		function backButtonF(e) {//android back button
		  e.preventDefault(); // looks like it doesn't prevent event currently
		  if($state.is('blank.login')) {
			navigator.app.exitApp(); // exit the app
		  } else if($state.is('tabs.popular')) {
		  	$state.go('tabs.popular');//instead of going to main go to itself for now
		  } else {
		  	$rootScope.$broadcast("previousView");//navigate back
		  }				
		}
			
		
		//for every route checks if user is logged in
		//https://github.com/angular-ui/ui-router/issues/178
		var nextState = null;
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		    if (!User.getLoginStatus()) {
            	
				//if it's a share request to open profile /profile/qwertyuiopas
            	if(toState.name === 'tabs.profile') {
            		$rootScope.$broadcast('errorAlert',"Authorization to Reviyou!","Please login first and retry given url.");
            	} 
            	//SECURITY CHECK: if we need to show error page and not logged in yet - don't redirect to login
            	
            	//todo: refactor so that if state starts with "notsecure." - to ignore it here for those states
               	if(toState.name !== 'tabs.errorWithMessage' 
            		&& toState.name !== 'tabs.error' 
            		&& toState.name !== 'blank.signUp' 
            		&& toState.name !== 'blank.signUpSubmitted' 
            		&& toState.name !== 'blank.forgotPassword' 
            		&& toState.name !== 'blank.forgotPasswordSubmitted'             		
            		&& toState.name !== 'blank.login') {
						event.preventDefault();
						//for whatever reason it doesn't work properly. preventDefault keeps trying to reload previous route
						//even thouhg it should not. It seems like transition doesn't work properly and angular timeout just 
						//reloads the previous start again 5 times before it gives up.
						//TODO: who'll be redirected to login page popup
						$state.transitionTo('blank.login',  null, { reload: true });
            	}
            } 
            // for  body class
            //$rootScope.bodyClass = '';
            
               });
        
         $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            
            if(typeof(analytics) != 'undefined') analytics.trackView($location.path());
           
           //#################CHANGINING PROFILE TOPBAR BACKGROUND ########################//
            //remove class manually added in profile.js: https://github.com/driftyco/ionic/issues/2732
            if(fromState.name=="tabs.profile") {
				$rootScope.$broadcast("initProfileTopBarHeaderBugFixLeave");			
            }
            //when we hit swipe back or back button back to profile we can't rely on profile.js to set bg color again since
            //it's cached so calling it explicitely. Don't call it all the time since when we first time come to profile
            //profile_theme is defined in the rest response of getProfile call
            //change topbar due to the defect with ion-side-bar:https://github.com/driftyco/ionic/issues/2732
			if((fromState.name=="tabs.addSkill"|| fromState.name=="tabs.addJob"|| fromState.name=="tabs.profileCreate1") && toState.name=="tabs.profile") {
            	$rootScope.$broadcast("initProfileTopBarHeaderBugFixEnter");	
            }
            //#################END OF CHANGINING PROFILE TOPBAR BACKGROUND ########################//

		 });
		 $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
		});
		$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
		});
		
		
		
		
		
		/*move below to another file  */
		//todo : clean up successAlert and successAlertCompleted
		  $rootScope.$on('successAlert', function (e, callback) {
          	  $ionicPopup.alert({
			     title: 'Success!',
			     template: 'We received you request, please allow us some time to process it.'
			   }); 
		   });
		  $rootScope.$on('successAlertCompleted', function (e, callback) {
          	  $ionicPopup.alert({
			     title: 'Success!',
			     template: 'Your request has been processed succesfully.'
			   }).then(function() {
			 	 	callback();								 	
			 }); 
		   });		  
		  $rootScope.$on('errorAlert', function (e, title, message) {
          	  $ionicPopup.alert({
			     title: title,
			     template: message
			   }) 
		   });
		   
		  $rootScope.$on('deleteConfirm', function (e, callback) {
          	$ionicPopup.confirm({
			   title: 'Delete',
			   //subTitle:'subtitle',
			   //cssClass:'confirm-popup',
			   template:  'Are you sure you want to delete?',
			   cancelText: 'Cancel',
			   cancelType: 'button-dark',
			   okText:'Delete',
			   okType: 'button-assertive'
			 }).then(function(res) {
			 	 	if(res) {
						callback();	
					}		 	
			 }); 
		   });
	        $rootScope.$on("previousView",function () {
	 			//if goint TO profile page apply this ionic release candidate ifx
			
				//var backView = $ionicViewService.getBackView();
				//$ionicHistory.backView
				if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) 			cordova.plugins.Keyboard.close();
				//TODO:
				//if(backView.stateName != "blank.main") {
					//backView && backView.go();
					$ionicHistory.goBack();
				//}
			});
	            
	
	        $rootScope.$on("initProfileTopBarHeaderBugFixEnter",function () {
	 			initProfileTopBarHeaderBugFixEnter();
			});
	        $rootScope.$on("initProfileTopBarHeaderBugFixLeave",function () {
	 			initProfileTopBarHeaderBugFixLeave();
			});

			/*
			we need it since conditional comments don't work on ion-side bar and we want custom color for each profile
			change topbar due to the defect with ion-side-bar:https://github.com/driftyco/ionic/issues/2732
			*/
			function initProfileTopBarHeaderBugFixEnter() {
		        	angular.forEach(document.querySelectorAll('ion-header-bar'), function(v) {
			            var element = angular.element(v);
			            element.addClass('theme-'+$rootScope.profileTheme);
			        });
			}
			function initProfileTopBarHeaderBugFixLeave() {
					angular.forEach(document.querySelectorAll('ion-header-bar'), function(v) {
			            var element = angular.element(v);
			            element.removeClass('theme-1 theme-2 theme-3 theme-4 theme-5 theme-6 theme-7 theme-8 theme-9 theme-10 theme-11 theme-12 theme-13  theme-14  theme-15');
			        });	
			}					
		   
    }]);
