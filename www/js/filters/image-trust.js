'use strict';
angular.module('reviyouMobileApp')
    .filter('imageTrust', ['$sce', function ($sce) {
	    return function(url) {
	    	return $sce.trustAsResourceUrl(url);
	    };
}]);
    
    
    
     
