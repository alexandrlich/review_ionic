'use strict';
angular.module('reviyouMobileApp')
    .controller('VotePageCtrl', ["$scope", "$rootScope", "$timeout", "profileProvider", "voteProvider", "$log","spinner","utils", function ($scope, $rootScope, $timeout, profileProvider, voteProvider, $log,spinner,utils) {
        
        var isGeneral;
        var skill;  
        //$scope.initVotePopup = function() {
        $scope.$on('initVotePopup', function() {
		  $scope.previousVote = '';
		  $scope.choosedSkillVote = '';
		  
	        //general or skill
			isGeneral = profileProvider.getIsGeneral();
			$log.log('isGeneral ' + isGeneral);
	        if(!isGeneral) {
		        skill = profileProvider.getActiveSkill();
				if (skill) {
		            $scope.previousVote = skill.vote_value;
		        }
		       
	        } else {
	       		$scope.previousVote = $scope.profile.general_vote 

	        }
			$log.log('previousVote ' + $scope.previousVote);
        

        });
        
        
        $scope.voteMarks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        $scope.setVote = function (vote) {
        	//var isRevote = if(typeof($scope.previousVote) == 'undefined') ? false : true;//needed for pi index increase
        	var isRevote = (typeof($scope.previousVote) == 'undefined' ? false : true);//needed for pi index increase
            utils.playMedia("select.wav");
            
            
            if(!isGeneral) {
				skillVote(vote, isRevote);
			} else {
				generalVote(vote, isRevote);
			}
		};	        
        
        //vote for general
        function generalVote(vote, isRevote) {
            
            var data = {
                profile_id: profileProvider.getProfileProp('id'),
                generalVote: vote,
                anonymous: true,//why is it true? why do we even need it?
                is_revote : isRevote
            };

			
            
			if(typeof(analytics) != 'undefined') analytics.trackEvent('Vote1', 'General', data.profile_id,vote);
			spinner.show();
            voteProvider.voteProfile(data, function (res) {
             	
             	$scope.profile.general_vote = vote;
		   		$scope.profile.general_average_rank = res.general_average_rank;
		   		$scope.profile.votes_count = res.votes_count;
		   		$scope.previousVote = vote;
            	$scope.autoclose();
            });
        }
        
        //vote for specific skill
        function skillVote(vote,isRevote) {
            var data = {
                skill_id: skill.id,
                profile_id: profileProvider.getProfileProp('id'),
                vote_value: vote,
                anonymous: true, // do we even need this?
                is_revote : isRevote
            };

            if(typeof(analytics) != 'undefined') analytics.trackEvent('Vote1', skill.skill_name, data.profile_id,vote);
				
            spinner.show();
            voteProvider.voteProfileSkill(data, function (res) {
                angular.forEach($scope.profile.skills, function (profileSkill) {
	                    if (profileSkill.id === skill.id) {
	                        profileSkill.skill_average_rank = res.skill_average_rank;
	                        profileSkill.vote_value = vote;
	                        profileSkill.votes_count = res.votes_count;
	                        
	                        //todo break;
	                    }
	                });

                $scope.previousVote = vote;
			
                $scope.autoclose();
				
            });        
        }
        
		
        
		$scope.autoclose = function() {
            spinner.hide();
            $scope.modal.hide();
        };

		//user click close
        $scope.close = function() {            
            if(typeof(analytics) != 'undefined') analytics.trackEvent('Vote1', 'UserClose', 'VotePage');
		    $scope.autoclose();
        }
    }]);
