'use strict';


angular.module('reviyouMobileApp')

    .controller('ProfileCtrl', ["$scope", "$rootScope", "profileProvider","requestProvider", "bookmarkProvider", "User", "$log","spinner","$ionicModal",  "profileDetails","$state","utils", "$ionicScrollDelegate","$timeout", function ($scope, $rootScope, profileProvider,requestProvider, bookmarkProvider, User, $log, spinner,$ionicModal,profileDetails,$state,utils, $ionicScrollDelegate,$timeout ) {
			
			
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(job) {
    if ($scope.isGroupShown(job)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = job;
      
        $timeout(function() {
	       $ionicScrollDelegate.scrollTop(); 
	    }, 100);
          
    }
    
      utils.resizeScroll();
      
      
  };
  $scope.isGroupShown = function(job) {
    return $scope.shownGroup === job;
  };	
  
  
  
  $scope.addSkillNav = function() {
  	  $state.go('tabs.addSkill', {id: profileDetails.id, profileTags: profileDetails.tags.join() });
  };
  
  
			
			
				
		$ionicModal.fromTemplateUrl('votepage.html', {
			    scope: $scope,
			    animation: 'slide-in-up'
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });

		//changes for each getProfile call
		
    	$rootScope.bodyClass = 'container-profile'; // body class
   		
   		$scope.user_id=User.getUserId();
   		
		$scope.profile = {};
		
		$scope.initials = '';
		
		
		
		
		// for skills
		$scope.maxVisibleSkills = 3;
		$scope.skills = [];


		//this is loaded upon initialization of the controller!
		
		
		
		$rootScope.$on('add-skill', function (event, skillData) {
			if (!$scope.profile.skills) {
				$scope.profile.skills = [];
			}
			//TODO: make sure it adds skill on top so it's visible for the user at the beginning at least
			var extendedSkill = angular.extend({},skillData, {
				skill_average_rank: null,
				vote_value: null,
				votes_count:0
			});
			
			$scope.profile.skills.unshift(extendedSkill);
			utils.resizeScroll();
		});
		//add from another screen
		$rootScope.$on('add-job', function (event, jobData) {
			$scope.profile.jobs.unshift(jobData);
			utils.resizeScroll();
		});
				
		$rootScope.$on('shareProfile', function () {
			$log.debug('shareProfile, profileID:' + 	$scope.profile.id)
			window.plugins.socialsharing.share('Check out this profile on Reviyou:', null, null, 'http://reviyou.com/share/' + $scope.profile.id);
		});
			
			
				
		
		//############   on load initialization end
		

		//############functions initialization start
		
		$scope.fetchSkills = function() {
			if($scope.profile.skills) $scope.skills = $scope.profile.skills.slice(0, $scope.maxVisibleSkills);
		};
		

        
               

		$scope.removeProfile = function() {
			$rootScope.$broadcast("deleteConfirm", function() {
		        spinner.show();
	            profileProvider.deleteProfile($scope.profile.id, function () {
					spinner.hide();
					$rootScope.$broadcast("successAlertCompleted",function(){
						$state.go("tabs.search");
					});
					
			   				 
			    });
	        });	
		};

        $scope.requestToRemoveProfile = function() {
	        $rootScope.$broadcast("deleteConfirm", function() {
		        spinner.show();
	            requestProvider.deleteProfileRequest($scope.profile.id, function () {
	                $rootScope.$broadcast("successAlert");
				    spinner.hide();
	            
	            });
	        });		    
        };
        
        $scope.changeProfileBookmarkState = function () {
			spinner.show();
			if($scope.profile.is_bookmarked) {//unbookmark
				if(typeof(analytics) != 'undefined') analytics.trackEvent('Profile', "follow", $scope.profile.id);
			
				bookmarkProvider.unBookmarkProfile($scope.profile.id, function () {
					$scope.profile.is_bookmarked = false;
					spinner.hide();     
				});
			} else {//bookmark
				if(typeof(analytics) != 'undefined') analytics.trackEvent('Profile', "unfollow", $scope.profile.id);
				bookmarkProvider.bookmarkProfile($scope.profile.id, function () {
					$scope.profile.is_bookmarked = true;
					spinner.hide();
            
				});
			}
		};

		
		$scope.openVote = function () {
			profileProvider.setIsGeneral(true);
			$scope.openModal();
			  
		};
		  
		

		$scope.openSkillVote = function (skillId) {
			profileProvider.setActiveSkillId(skillId);
			profileProvider.setIsGeneral(false);
			$scope.openModal();
		};
		
		$scope.openModal = function() {
		    $scope.modal.show();
		    $scope.$broadcast ("initVotePopup");
		  };
		  $scope.closeModal = function() {
		  	$scope.modal.hide();
		  };
		  //Cleanup the modal when we're done with it!
		  $scope.$on('$destroy', function() {
		  	$scope.modal.remove();
		  });
		
		$scope.showAllSkills = function() {
			$scope.skills = $scope.profile.skills;
			$scope.skillsShortcut = false;
        };
        
        $scope.skillsShortcut = function(){     	
        	return $scope.profile && $scope.profile.skills ? $scope.profile.skills.length - $scope.skills.length > 0 : false;
        	
        	// return true;
        };
		
		//############init profile
		(function initProfile() {
		   		$scope.profile = profileDetails;
				$scope.fetchSkills(); // load skills
				$rootScope.profileTheme = profileDetails.theme_name;
				//$scope.profile.initials = utils.nameInitials(profileDetails.name);

				$rootScope.$broadcast("initProfileTopBarHeaderBugFixEnter");
				spinner.hide();	
		})();
		
		
	
	}]);
