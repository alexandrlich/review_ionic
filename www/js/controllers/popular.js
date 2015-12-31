'use strict';

angular.module('reviyouMobileApp')
    .controller('PopularCtrl', ["$scope", "popularProvider", "$rootScope", "$log", "spinner","User","$ionicSideMenuDelegate","$stateParams",function ($scope, popularProvider, $rootScope, $log,spinner,User,$ionicSideMenuDelegate,$stateParams) {

		//for all pages except filter
		$scope.onSwipeLeft= function() {
			 $ionicSideMenuDelegate.toggleLeft();
		}
		
		$scope.$on('$ionicView.leave', function(){
		  $ionicSideMenuDelegate.canDragContent(true);//for oher page
		});
		
		//for the filter to avoid opening menu
		$ionicSideMenuDelegate.canDragContent(false);

        var offset;
		//var offset =0 ;
		//$scope.popular = [];
		$scope.moreDataCanBeLoaded = true;
		//$scope.noResults = false;//for empty list message
		
		
		//init tags
		$scope.userTags = [];//{name:"aaa", selected:false}
		$scope.userTags.push({name:"all", selected: true});
		for(var i = 0;i<User.getSelectedTags().length;i++) {
			$scope.userTags.push({name:User.getSelectedTags()[i], selected: false});
			
		}

		//tmp:
		//$scope.currentTagName = User.getSelectedTags().join();   
		    
	//called from UI, don't call explicitely unless when you filter on the page	    
	  $scope.loadMore = function(showSpinner) {	    
	    if(showSpinner) spinner.show(); 
        popularProvider.getPopularProfiles(offset,$scope.currentTagName, function (res) {    
        
        	$scope.popular = $scope.popular.concat(res);
            if(res.length==0)  {
            	$scope.moreDataCanBeLoaded = false;
            	if($scope.popular.length==0) {
            		$scope.noResults = true;
            	}
            }           
            $scope.$broadcast('scroll.infiniteScrollComplete');
            offset += res.length;
            if(showSpinner) spinner.hide(); 
        });
	  };
	  
	  	//only when you filter on the page, don't call explicitely
	  	$scope.filterPopular = function(tag) {
			if(!tag.selected) {
				if(tag.name ==="all") {
					$scope.currentTagName = User.getSelectedTags().join();    			
				} else {
					$scope.currentTagName = tag.name;    		
				}
				if(tag.name == $stateParams.tagName) {
					$scope.newTag = $stateParams.tagName;
				} else {
					$scope.newTag = false;
				}
				
				for(var i = 0;i<$scope.userTags.length;i++) {
					if(tag.name !== $scope.userTags[i].name) {
						$scope.userTags[i].selected = false;
					} else {
						$scope.userTags[i].selected = true;
					}
				
				}		
				offset =0;
				$scope.popular = [];
				$scope.noResults = false;
				$scope.loadMore(true);
			}
		}; 
		
		  
		
		function checkIfClickedFromTag() {
			if(typeof $stateParams.tagName !== 'undefined'  && $stateParams.tagName.length>0){//ifcomes from tag on profile
	        	$scope.newTag = false;  
	        	if(User.getSelectedTags().indexOf($stateParams.tagName) > -1) {//clicked existing tag
		        	$scope.currentTagName = $stateParams.tagName;
	        	} else {//clicked unsupported tag
	        	
		        	$scope.currentTagName = $stateParams.tagName; 
		        	$scope.userTags[0].selected = false;
		        	$scope.userTags.push({name:$stateParams.tagName, selected: true});
		        	//todo: check if use has this tag  
		        	$scope.newTag = $stateParams.tagName; 
		        	
	        	}
			} else {//regular popular navigatoin
				$scope.currentTagName = User.getSelectedTags().join(); //show all by default
				//$scope.loadMore(false); 
			
			}
			
			offset =0;
			$scope.popular = [];
			$scope.noResults = false;
					
			
		} checkIfClickedFromTag();
		

		//$rootScope.bodyClass = 'container-popular'; // body class, do we need it???

		//if login session is active and user comes back - 
		//hide splash image here for smoother effect, not in index.html and not in  main.js
		//navigator.splashscreen.hide();
	
    }]);

