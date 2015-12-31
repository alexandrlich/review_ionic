'use strict';

angular.module('reviyouMobileApp')
    .controller('ViewSelectedTagsCtrl',["$scope","$state", "$log", "spinner","tagsProvider","userProvider","User","utils",function ($scope, $state,$log,spinner,tagsProvider,userProvider,User,utils) {
		//everything - tags and subtags
		$scope.selectedTags = User.getSelectedTags();
				
		$scope.removeTag = function(tag_name) {
		 	utils.playMedia("tags.wav");
            
			userProvider.deselectTags(User.getUserId(),tag_name, function() {
					for (var i = 0; i < $scope.selectedTags.length; i++) {
			        	if ($scope.selectedTags[i] === tag_name) {
			            	$scope.selectedTags.splice(i, 1);
							break;
			            }
			        }
					User.removeTag(tag_name);
				});
			
			
			

		};
		
		
				  
    }]);
