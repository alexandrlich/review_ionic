'use strict';

angular.module('reviyouMobileApp')
    .controller('AddTagsCtrl',["$scope","$rootScope","$state", "$log", "spinner","tagsProvider","userProvider","User","utils",function ($scope,$rootScope, $state,$log,spinner,tagsProvider,userProvider,User,utils) {
		
		//spinner.hide();
		
		$scope.currentTags = []; 
		//$scope.moreTags = true;
      	$scope.$watch(function(scope) {return User.getSelectedTags().length;},
	         function(newValue, oldValue) {
	             $scope.selectedTagsCount = newValue;
	         }
		);
		 /*not currently used 
		$scope.changeSearch = function() {
			$scope.offset = 0;
			if($scope.searchTagString==='') {
				$scope.moreTags = true;
				getTagsByOffset();
			} else {			
	        	tagsProvider.search($scope.searchTagString, function(data) {
					convertToCurrentTags(data);					
				}); 
			}
        	
		};  */
		  
		//$scope.offset = 0;
		
		
		
		getAllTags();//first time
		
		/*not currently used 
		$scope.loadMore = function() {
			spinner.show();
				
			getTagsByOffset();
		};*/
		
		$scope.navViewSelectedTags = function() {
			 if(User.getSelectedTags().length>0) {
			 	$state.go("tabs.viewselectedtags");
			 } else {
				$rootScope.$broadcast("errorAlert","Select Interests","Please choose a few interests.");	
			 }
		}
		
		$scope.navPopularFromTags = function() {
			 if(User.getSelectedTags().length>0) {
			 	$state.go("tabs.popular");
			 } else {
				 $rootScope.$broadcast("errorAlert","Select Interests","Please choose a few interests.");	
			 }
		}
		//click 1st level tag
		$scope.clickTag = function(tag_name, currently_selected) {
			utils.playMedia("tags.wav");
            
			if(currently_selected) {
				userProvider.deselectTags(User.getUserId(),tag_name, function() {
					markTagSelected(tag_name,false);
					User.removeTag(tag_name);
				});
			} else {
				userProvider.selectTag(User.getUserId(),tag_name, function() {
					markTagSelected(tag_name,true);
					User.addTag(tag_name);
					
				});
			}
		}
		//click 2st level tag
		$scope.clickSubTag = function(tag_name,  subtag_name, currently_selected) {
			utils.playMedia("tags.wav");
            for (var i = 0; i < $scope.currentTags.length; i++) {
                    if ($scope.currentTags[i].name === tag_name) {
                    	
                    	if(!currently_selected) {//selecting subtag deselects tag
                    		
                    		userProvider.deselectTags(User.getUserId(),tag_name, function() {
								$scope.currentTags[i].selected = false;
								User.removeTag(tag_name);
							});

                    	}
                    		
                    	for (var j = 0; j < $scope.currentTags[i].subtags.length; j++)  {			
							if ($scope.currentTags[i].subtags[j].name === subtag_name) {
								if(currently_selected) {//deselect subtag
									userProvider.deselectTags(User.getUserId(),subtag_name, function() {
										$scope.currentTags[i].subtags[j].selected = false;
										User.removeTag(subtag_name);
									});
									
									
								} else {//select subtag
									userProvider.selectTag(User.getUserId(),subtag_name, function() {
										$scope.currentTags[i].subtags[j].selected = true;
										User.addTag(subtag_name);
									});
									
									
								}
								break;
							}
						}
						break;
                    }
            }
            
		}		
		
		function markTagSelected(tag_name,selected) {
			for (var i = 0; i < $scope.currentTags.length; i++) {
                    if ($scope.currentTags[i].name === tag_name) {
                        $scope.currentTags[i].selected = selected;
                        if(selected) {//select tag, deselect all subtags
	                        var subtagsList = [];
	                        
	                        for (var j = 0; j < $scope.currentTags[i].subtags.length; j++)  {			
								subtagsList.push($scope.currentTags[i].subtags[j].name);
							}
							userProvider.deselectTags(User.getUserId(),subtagsList.join(), function() {
								
								for (var j = 0; j < $scope.currentTags[i].subtags.length; j++)  {			
									if($scope.currentTags[i].subtags[j].selected) {
										User.removeTag($scope.currentTags[i].subtags[j].name);
									}
									$scope.currentTags[i].subtags[j].selected = false;
										
								}
							});
						}
						break;
                    }
             }
		}
		
		function getAllTags() {
			spinner.show();
			tagsProvider.getTags(0, function(data) {
				convertToCurrentTags(data);
				$log.debug('test2 ' + JSON.stringify($scope.currentTags));
             
				syncUserTags();

				spinner.hide();
				
			}); 
		}
		
				
		/**
		tmp method
		
		remove all tags that are not longer availble in database
		We don't have to do it since during login we reset what we store in user session anyway.
		
		We do it here just for the case when use session is long and deprecated and have extra data we have no longer in db
		*/	
		function syncUserTags() {
			var userTags = User.getSelectedTags();
			
			for (var k = 0; k < userTags.length; k++)  {			
				if(!tagExist(userTags[k])) {
					User.removeTag(userTags[k]);
				}
			}
		}
		
		function tagExist(tagName) {
			for (var i = 0; i < $scope.currentTags.length; i++) {
                if ($scope.currentTags[i].name === tagName) {
					return true;
				} else {
					for (var j = 0; j < $scope.currentTags[i].subtags.length; j++)  {			
						if ($scope.currentTags[i].subtags[j].name === tagName) {
							return true;
						}
					}
				}
			}
			return false;
		}
		
		//converts to inner model:
		/**
		converts to inner model:
			tag = {name:string
				   selected:boolean
				   subtags: [{name:String,selected:boolean}]
				   }			
		*/
		function convertToCurrentTags(availableTags) {
			
			if(availableTags.length>0) {
				$scope.currentTags = [];
				$log.debug('testBefore ' + JSON.stringify(availableTags));
             
				for (var i = 0; i < availableTags.length; i++) {
					
					//TODO:check if User object has it and mark as selected
					var isTagSelected = (User.getSelectedTags().indexOf(availableTags[i].name) > -1);
					
					var subtagsList = [];
					if (!!availableTags[i].subtags) {//not null check
						for (var j = 0; j < availableTags[i].subtags.length; j++)  {			
							var isSubTagSelected = (User.getSelectedTags().indexOf(availableTags[i].subtags[j]) > -1);
							subtagsList.push({
								name:availableTags[i].subtags[j],
								selected:isSubTagSelected
							});
						}
						
						$scope.currentTags.push(
						{
						name:availableTags[i].name,
						selected:isTagSelected,
						subtags:subtagsList
						})
					
					}//TODO:moveit below so that we only push for parents
						
						
				}
			}
		}
				
		
		
		  
    }]);
