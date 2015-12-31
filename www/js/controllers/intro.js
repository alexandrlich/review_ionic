'use strict';

angular.module('reviyouMobileApp')
    .controller('IntroCtrl',["$scope","$state", "$ionicSlideBoxDelegate", "spinner",function ($scope, $state, $ionicSlideBoxDelegate,spinner) {
		
	spinner.hide();
	$ionicSlideBoxDelegate.slide(0);
	  
	$scope.next = function(slIndex) {
		if(typeof slIndex === "undefined") slIndex = 0;
	    if(slIndex<4) {
		    $ionicSlideBoxDelegate.next();
	    } else {
		    $state.go('tabs.addtags');
	    }
	  };	  	  
	
	  $scope.previous = function(slIndex) {
	  	if(typeof slIndex === "undefined") slIndex = 0;
	    if(slIndex==0) {
		    $state.go('tabs.addtags');
	    } else {
	    	$ionicSlideBoxDelegate.previous();
	    }
	  };
	  
	  // Called each time the slide changes
	  $scope.slideChanged = function(index) {
	    $scope.slideIndex = index;
	  }; 
	  
	   
           
    }]);
