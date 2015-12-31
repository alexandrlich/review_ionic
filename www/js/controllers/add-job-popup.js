'use strict';

angular.module('reviyouMobileApp')
    .controller('AddJobCtrl', ["$scope", "$rootScope", "$stateParams", "profileProvider", "requestProvider", "professionProvider", "$log","spinner","utils", function ($scope, $rootScope, $stateParams, profileProvider, requestProvider,professionProvider, $log,spinner,utils) {
        $scope.jobData = {
            occupation: '',
            company_name: '',
            start_date: '',
            end_date: ''
            // start_date: new Date(),
            // end_date: new Date()
        };
        
        $scope.isRequest = $stateParams.isRequest;
		
		
		
        $scope.addJob = function () {
         
         if ($scope.jobData.occupation) {
         	
         	
         	if($scope.jobData.start_date == '')
	         $scope.jobData.start_date =0;
          	if($scope.jobData.end_date == '')
	         $scope.jobData.end_date =0;        	
         	         	/*
             
             if($scope.jobData.start_date != '')
	         	//$scope.jobData.start_date = utils.convertInputDateToString(new Date($scope.jobData.start_date).toLocaleDateString());
			 	$scope.jobData.start_date = utils.convertInputDateToString($scope.jobData.start_date);


	         if($scope.jobData.end_date != '')
	         	//$scope.jobData.end_date = utils.convertInputDateToString(new Date($scope.jobData.end_date).toLocaleDateString());
	           $scope.jobData.end_date = utils.convertInputDateToString($scope.jobData.end_date);
	          */               
	    
	                              
	         spinner.show();
	
	         if($stateParams.isRequest) {
	            requestProvider.addJobRequest($stateParams.id, $scope.jobData, function () {
	                spinner.hide();
					$rootScope.$broadcast('previousView');
					//maybe we should show a confirmation that request has been accepted here?
	            });	         
	         } else {
	            profileProvider.addJob($stateParams.id, $scope.jobData, function () {
	                $rootScope.$broadcast('add-job', $scope.jobData);
	                spinner.hide();
					$rootScope.$broadcast('previousView');
	
	            });	         
	         }
         } else {
	         $rootScope.$broadcast("errorAlert","Validation Problem","Please make sure that at least occupation is entered(prefferably with company name and dates)");		
         }
        };
        
        
        //on load fetch professions
        spinner.show();
        professionProvider.getProfessions(function (professions) {
            spinner.hide();
			$scope.professions = angular.copy(professions);
        });

    }]);
