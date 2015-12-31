	'use strict';
angular.module('reviyouMobileApp')
    .controller('CreateProfileCtrl', ["$scope", "$rootScope", "$state","$stateParams", "profileProvider", "professionProvider", "$log","spinner","utils", function ($scope, $rootScope,  $state, $stateParams, profileProvider, professionProvider, $log,spinner,utils) {
        $scope.newProfile = profileProvider.getCreateProfileData();
          
         //TODO: we can cache this call probably?
         if(typeof $stateParams.loadProfession !== 'undefined'){//ifcomes from quicksearch
        	spinner.show();            
			professionProvider.getProfessions(function (professions) {
        		$scope.professions = angular.copy(professions);
				spinner.hide();            
			});
		 } else {
			spinner.hide();  
		 }
        

        
	function onCreateSuccess (res) {
		   $log.debug('onCreateSuccess ' + JSON.stringify(res));
            
           profileProvider.resetCreateProfileData()
           $scope.newProfile = profileProvider.getCreateProfileData();
           spinner.hide();
            	
            $state.go("tabs.profileCreate3");
            
            
        }
        function onCreationError(res) {
         	$log.error('onCreationError ' + JSON.stringify(res));
          
	        spinner.hide();           
        }
      	
      


	    
		$scope.nextPage = function() {
		//TODO: validate email
			if($scope.newProfile.name && utils.validateEmail($scope.newProfile.email)) {
				$state.go("tabs.profileCreate2", {'loadProfession':"true"});
			} else {
				$rootScope.$broadcast("errorAlert","Validation Problem","Please make sure first, last name and email are entered correctly.");				
			}
			
		}

        
        $scope.createProfile = function () {
            if ($scope.newProfile.jobs[0].occupation) {
                spinner.show();
            	
            	/*
            	if($scope.newProfile.jobs[0].start_date) 
                $scope.newProfile.jobs[0].start_date = utils.convertInputDateToString(new Date($scope.newProfile.jobs[0].start_date).toLocaleDateString());
			    if($scope.newProfile.jobs[0].end_date) 
                $scope.newProfile.jobs[0].end_date = utils.convertInputDateToString(new Date($scope.newProfile.jobs[0].end_date).toLocaleDateString());
      */
				profileProvider.createProfile($scope.newProfile, onCreateSuccess, onCreationError);
           } else {
                $rootScope.$broadcast("errorAlert","Validation Problem","Please make sure that at least occupation is entered(prefferably with company name and dates)");		
            }
        };




    }]);
