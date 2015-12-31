'use strict';

/*
When this controller is initialized - we are retrieving profile by id from the backend.
Note that because of that this controller should not be reinitialized in other places,
like for example in the top bar because it'll lead to extra requests
*/

//TODO: move comments logic to the separate controller maybe?
angular.module('reviyouMobileApp')
    .controller('CommentCtrl', ["$scope",  "$rootScope", "commentProvider",  "User", "$log","spinner","utils",function ($scope, $rootScope, commentProvider, User, $log, spinner,utils) {
		
   		$scope.user_id = User.getUserId();
   		
   		var offset = 0;
      $scope.comments = [];
		$scope.newComment = '';
		 $scope.moreDataCanBeLoaded = true;

		
	$scope.loadMore = function() {
	    //spinner.show();
	    console.log('loadmore');
        commentProvider.getComments($scope.profile.id, offset, function (res) {

        	$scope.comments = $scope.comments.concat(res);
            if(res.length==0) {
	        	$scope.moreDataCanBeLoaded = false;
	
	        }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            offset += res.length;
            utils.resizeScroll();
        });
	  };
	  //for some reason UI didn't call it so we do!
$scope.loadMore();
         
        //TODO: change it to go via server side!!!!
        $scope.sendComment = function () {
			if($scope.newComment) {
	
			    spinner.show();
			    commentProvider.addProfileComment($scope.profile.id, $scope.newComment, function (response) {
			    	$scope.comments.unshift(
			        	{comment_id: response.comment_id, 
			        	text: response.text, 
			        	create_time: response.create_time,
			        	user_first_name: response.user_first_name,
			        	user_id: response.user_id,
			        	user_last_name: response.user_last_name,
			        	user_image_url: User.getUserValue('user_image_url')
			        	});
			        $scope.newComment = '';
			        offset++;
			        $scope.profile.comments_count++;
			        
			        utils.resizeScroll();
			        //todo maybe add a check that user doesn't add 1000 comments at once - unlikely though
			        spinner.hide();
			        
			        if(!$scope.profile.is_bookmarked && User.getFollowOnCommentOption()) {
			           $scope.changeProfileBookmarkState();
			        }
			    
			    });
			} else {
				$rootScope.$broadcast("errorAlert","Validation","Please Enter some text if you are trying to comment on the profile");				
			}

        };
        
        
        $scope.commentVote = function(commentId,voteGroup, votedAlready) {
	        spinner.show();
	        if(votedAlready) {//unvote
		    	removeCommentVote(commentId,voteGroup);
			} else {//vote
	        	addCommentVote(commentId,voteGroup);
		    }
	    };        
        
        function removeCommentVote(commentId,voteGroup) {
	      	commentProvider.unvote(commentId,voteGroup, function (response) {
		        //decrease count
		        for (var i = 0; i < $scope.comments.length; i++) {
		        	if ($scope.comments[i].comment_id === commentId) {
		            	switch (voteGroup) {
						    case 'group_warm':
						    	$scope.comments[i].warm_voted=false;
						    	if($scope.comments[i].warm_count>0) $scope.comments[i].warm_count--;
								break;
						    case 'group_cold':
						    	$scope.comments[i].cold_voted=false;
						    	if($scope.comments[i].cold_count>0) $scope.comments[i].cold_count--;
								break;
						    case 'group_troll':
						    	$scope.comments[i].troll_voted=false;
						    	if($scope.comments[i].troll_count>0) $scope.comments[i].troll_count--;
								break;
						    case 'group_report':
						    	$scope.comments[i].report_voted=false;
						    	if($scope.comments[i].report_count>0) $scope.comments[i].report_count--;
								break;
						    default: 
				                break; 
				        }
				        break;
		            }
		        }
		        spinner.hide();
            
	        });
	    }

	    
	    function addCommentVote(commentId,voteGroup) {
	        commentProvider.vote(commentId,voteGroup, function (response) {
		        //decrease count
		        for (var i = 0; i < $scope.comments.length; i++) {
		        	if ($scope.comments[i].comment_id === commentId) {
		            	switch (voteGroup) {
						    case 'group_warm':
						    	$scope.comments[i].warm_voted=true;
						    	if (typeof $scope.comments[i].warm_count === "undefined") {
						    		$scope.comments[i].warm_count = 1;						    	
						    	} else {
						    		$scope.comments[i].warm_count++;
						    	}
								break;
						    case 'group_cold':
						    	$scope.comments[i].cold_voted=true;
						    	if (typeof $scope.comments[i].cold_count === "undefined") {
						    		$scope.comments[i].cold_count = 1;						    	
						    	} else {
							    	$scope.comments[i].cold_count++;
							    }
								break;
						    case 'group_troll':
						    	$scope.comments[i].troll_voted=true;
						    	if (typeof $scope.comments[i].troll_count === "undefined") {
						    		$scope.comments[i].troll_count = 1;						    	
						    	} else {
							    	$scope.comments[i].troll_count++;
							    }
								break;
						    case 'group_report':
						    	$scope.comments[i].report_voted=true;
						    	if (typeof $scope.comments[i].report_count === "undefined") {
						    		$scope.comments[i].report_count = 1;						    	
						    	} else {
						    		$scope.comments[i].report_count++;
								}
								break;
						    default: 
				                break; 
				        }
				        break;
		            }
		        }
		        spinner.hide();
            
	        });
        }
        
        
		$scope.deleteComment = function(commentId) {
			$rootScope.$broadcast("deleteConfirm", function() {
		        spinner.show();
	            commentProvider.removeProfileComment(commentId, function (response) {
	        		$log.info('comment was removed, id:' + commentId);
					$scope.profile.comments_count--;
					
					
					//$scope.comments = $scope.comments.concat(res);
            
					for(var i=0;i<$scope.comments.length;i++) {
						if ($scope.comments[i].comment_id === commentId) {
							$scope.comments.splice(i, 1);
							break;
						}
					}
					
					utils.resizeScroll();
					spinner.hide();
	            
	        		
				});
	        });	
		};        

		
		
	
	}]);
