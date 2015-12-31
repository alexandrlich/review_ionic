'use strict';
//this is a landing page after login or if your session is still stored and active
angular.module('reviyouMobileApp')
    .controller('MainMenuCtrl', ["$scope","$rootScope","notificationsProvider", "User", function ($scope,$rootScope,notificationsProvider, User) {
    			
    			//$scope.recentNewsExist = false;
    			//todo: move all to the directive
    			
    			//todo: followers count?
    			
      			$scope.$watch(function(scope) { return User.getSelectedTags().length; },
	              function(newValue, oldValue) {
	                  $scope.selectedTagsCount = newValue;
	              }
				 );
    			
    			//lister when you relogin with another account 
    			$scope.$watch(function(scope) { return User.getUserData(); },
	              function(newValue, oldValue) {
	                  $scope.user = newValue;
	              }
				 );

    			$rootScope.$watch(function(rootScope) { return User.getNotificationsCount(); },
	              function(newValue, oldValue) {
	                  $rootScope.newNotificationsCount = newValue;
	              }
				 );    			
    			
    			//use for like us option
    			var isIOS = ionic.Platform.isIOS();
				var isAndroid = ionic.Platform.isAndroid();
  
    		     //call to check recent news exist or not for the menu
				//newsProvider.checkRecentNewsExist(function(response) {
				//	$scope.recentNewsExist = response.recentNewsExist;;
		        //});     
		        
		        
}]);