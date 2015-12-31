'use strict';


angular.module('reviyouMobileApp')
    .controller('QuickSearchCtrl', ["$scope","$rootScope", "$window", "$location", "$log", "spinner", "$state", function ($scope,$rootScope, $window, $location, $log, spinner, $state) {
		$log.debug('QuickSearchCtrl init');

		$scope.quickSearchString = '';
     			
        
         $scope.quickSearch = function() {
        	$log.debug('quickSearch, quickSearchString:' + $scope.quickSearchString);
        	if(typeof(analytics) != 'undefined') analytics.trackEvent('Search', "quick", $scope.quickSearchString);
			
           //$rootScope.quickSearchString = $scope.quickSearchString;
	       //$rootScope.$broadcast('quicksearch');
	         spinner.show();
			 $state.go("tabs.searchString",{'searchString':  $scope.quickSearchString});
	    };

	}]);
