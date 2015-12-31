'use strict';

angular.module('reviyouMobileApp')
    .controller('VotedProfilesCtrl', ["$scope",  "$log","spinner","utils","voteProvider",function ($scope,  $log,spinner,utils,voteProvider) {
        
        
      $scope.votedProfiles = [];
      var offset = 0;
      $scope.noResults = false;//for empty list message

	  
	  $scope.moreDataCanBeLoaded = true;


	  $scope.loadMore = function() {
	    //spinner.show();
        voteProvider.getVotedProfiles(offset, function (res) {
        	$scope.votedProfiles = $scope.votedProfiles.concat(res);
            if(res.length==0) {
	        	$scope.moreDataCanBeLoaded = false;
	        	if($scope.votedProfiles.length==0) {
	        		$scope.noResults = true;
	        	}
	        }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            offset += res.length;
            //spinner.hide();
        });
	  };	
	  
	  //$scope.loadMore();  

      $scope.remove = function(votedItem) {
      	spinner.show();

        voteProvider.hideVotedProfile(votedItem.id, function (res) {
	        $scope.votedProfiles.splice($scope.votedProfiles.indexOf(votedItem), 1);
	        //$ionicListDelegate.closeOptionButtons();
	        spinner.hide();

	    });
      }
      
      
      
}]);
