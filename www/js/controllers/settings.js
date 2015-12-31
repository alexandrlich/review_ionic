'use strict';
//this is a landing page after login or if your session is still stored and active
angular.module('reviyouMobileApp')
    .controller('SettingsCtrl', ["$scope",  "userProvider", "User", function ($scope, userProvider, User) {
    			
    			$scope.settingsSound  = User.getSoundsEnabledOption();
    			$scope.followOnComment  = User.getFollowOnCommentOption();
    			
    			$scope.changeSoundSetting = function() {
    				var newVal = !$scope.settingsSound;
	    			if(typeof(analytics) != 'undefined') analytics.trackEvent('Settings', "Sound", "newValue",newVal);
    				userProvider.saveSoundSetting(User.getUserId(),newVal, function() {
						User.setSoundsEnabledOption(newVal);
						$scope.settingsSound = newVal;
	    			});
				}
	    			

    			$scope.changeFollowOnCommentSetting= function() {
    				var newVal = !$scope.followOnComment;
	    			if(typeof(analytics) != 'undefined') analytics.trackEvent('Settings', "Following", "newValue",newVal);
    				userProvider.saveFollowSetting(User.getUserId(),newVal, function() {
						User.setFollowOnCommentOption(newVal);
						$scope.followOnComment = newVal;
	    			});
				}
    					        
}]);