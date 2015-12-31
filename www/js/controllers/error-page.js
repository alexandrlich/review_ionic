'use strict';

angular.module('reviyouMobileApp')
    .controller('ErrorPageCtrl', ['$scope', '$stateParams',  function ($scope, $stateParams) {
    	
        $scope.errorCode = $stateParams.code;
		$scope.customErrorMessage = $stateParams.customMessage;
		
        
    }]);
