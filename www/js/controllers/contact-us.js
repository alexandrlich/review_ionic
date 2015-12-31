'use strict';

angular.module('reviyouMobileApp')
    .controller('ContactUsCtrl',["$scope", "$rootScope",  "contactProvider", "spinner","utils", function ($scope, $rootScope, contactProvider,spinner,utils) {
        
        $scope.problem = {
            subject: "General question",
            description: ""
        };

        $scope.submitForm = function () {
            spinner.show();
            contactProvider.postFeedback($scope.problem, function () {
         	   spinner.hide();
			   $rootScope.$broadcast("successAlert",function(){$state.go("tabs.search");});
			   			   
            	
		    });
        };
    }]);
