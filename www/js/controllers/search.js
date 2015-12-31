'use strict';

angular.module('reviyouMobileApp')
    .controller('SearchCtrl', ["$scope",  "searchProvider",  "$stateParams","$log", "spinner", function ($scope, searchProvider, $stateParams,$log, spinner) {
        
        
        $scope.searchString = '';
        $scope.searchPerformed = false;
        checkIfPerformQuickSearch();
	        
        //local search from the current page
        $scope.search = function () {
        	if(typeof(analytics) != 'undefined') analytics.trackEvent('Search', "normal", $scope.searchString);
			
        	actualSearch();
        };
        
        $scope.change = function() {//input change
	        $scope.searchPerformed = false;
        }
        
        //if search from the outside of the page,if so - perform the search
        function checkIfPerformQuickSearch() {
	        
	        if(typeof $stateParams.searchString !== 'undefined'  && $stateParams.searchString.length>0){//ifcomes from quicksearch
        		$scope.searchString = $stateParams.searchString;
				actualSearch();
			} else{
				spinner.hide();           
			}
        };

        
        
        function actualSearch() {
	    	$log.debug('search, search str: ' + $scope.searchString);
            spinner.show();
            
            searchProvider.search($scope.searchString, function (res) {
            	$log.debug('search result using search key=' + $scope.searchString);
		$scope.searchResult = res;

            	$log.debug('search result2');
            	$scope.searchPerformed = true;
				spinner.hide();
            
            });

        };

        $scope.clearSearch = function () {
            $scope.searchString = '';
            $scope.searchResult = '';
            $scope.searchPerformed =false;
            //TODO: set cursor to search input somehow
                
        };


   
    }]);
        



