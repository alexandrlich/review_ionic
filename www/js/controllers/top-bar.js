'use strict';


angular.module('reviyouMobileApp')
    .controller('TopBarCtrl', ["$scope","$rootScope", "$window", "$log", "$state","pushNotificationsProvider", function ($scope,$rootScope, $window, $log, $state,pushNotificationsProvider) {
		$scope.quickSearchString = '';
     			
       $scope.share = function() {
    		$rootScope.$broadcast("shareProfile");
        };
 	

		$rootScope.previousView = function() {
			$rootScope.$broadcast("previousView");
		};

		


	}]);
