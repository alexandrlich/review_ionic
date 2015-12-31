'use strict';

angular.module('reviyouMobileApp')
 
    .controller('ProfileSkillsCtrl',["$scope", "$log", "spinner", 'allowedSkills',function ($scope,  $log, spinner, allowedSkills  ) {
     $scope.skills = allowedSkills;
		
     }])
 
    .controller('AddSkillPopupCtrl',["$scope", "$rootScope", "$stateParams", "skillProvider", "profileProvider", "requestProvider","$filter", "$log", "spinner",function ($scope, $rootScope, $stateParams, skillProvider, profileProvider, requestProvider,$filter, $log, spinner ) {
        
        
        $scope.selectedSkillId = undefined;
		
		spinner.hide();
        
        function onSuccessAddProfileSkill () {
            $log.debug('onSuccessAddProfileSkill' );
            spinner.hide();
            
			var skill = $filter('filter')($scope.skills, {id: $scope.selectedSkillId}, true);
       
            if (skill.length) {
            	$rootScope.$broadcast('add-skill', skill[0]);
			} else {
				$log.error('not found skill by id');
				//todo: show error message maybe.
			}
            $rootScope.$broadcast('previousView');
        }

        function onErrorAddProfileSkill () {
        	spinner.hide();
            $rootScope.$broadcast('errorAlert',"Creation error!","Sorry, skill cannot be added at this time, please try again later or contact us directly");
            $rootScope.$broadcast('previousView');
            
        }

        function onSuccessCustomSkillRequest () {
        	spinner.hide();            
        	$rootScope.$broadcast('previousView');
            $rootScope.$broadcast("successAlert");
			   
		
        }

        function onErrorCustomSkillRequest () {
			 spinner.hide();
             $rootScope.$broadcast('errorAlert',"Creation error!","Sorry, custom skill cannot be requested at this time, please try again later or contact us directly");
        }
		
		
		

            
        //skillProvider.getSkills(function (skills) {
        //    $scope.skills = angular.copy(skills);
        //});

        $scope.addSkill = function () {
        	$log.debug('addSkill id: ' + $scope.selectedSkillId);
            if(typeof $scope.selectedSkillId==='undefined') {
	            $rootScope.$broadcast("errorAlert","Validation message","Choose a skill from the list");

            } else {
            	spinner.show();
            	profileProvider.addProfileSkill($stateParams.id, $scope.selectedSkillId,
                    onSuccessAddProfileSkill, onErrorAddProfileSkill);
            }
                        
        };
        
        $scope.addCustomSkill = function () {
            if( $scope.customSkill ) {
				spinner.show();
				requestProvider.addCustomSkillRequest($stateParams.id, $scope.customSkill,
                    onSuccessCustomSkillRequest, onErrorCustomSkillRequest);
            } else {
     	       $rootScope.$broadcast("errorAlert","Validation message","Please enter custom skill name you want to be created");
	        }
            
        };
        
        
      

        
    }]);
