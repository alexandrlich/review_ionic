'use strict';

angular.module('reviyouMobileApp')
    .controller('NotificationsCtrl', ["$scope", "notificationsProvider","spinner", "$state","$ionicListDelegate","User",function ($scope, notificationsProvider,spinner, $state,$ionicListDelegate,User) {
    	
    	
       var offset = 0;
       $scope.notifications = [];
	   $scope.moreDataCanBeLoaded = true;
        
	  
	  $scope.loadMore = function() {
	    notificationsProvider.getNotifications(offset, function (res) {
        	$scope.notifications = $scope.notifications.concat(res);
            //console.log('res.length ' + res.length);
            if(res.length==0) {
	            $scope.moreDataCanBeLoaded = false;
	        }
            
        
            $scope.$broadcast('scroll.infiniteScrollComplete');
            offset += res.length;
            
        });
        

	  };
	  
	  //$scope.loadMore()

        $scope.ack = function(ntfk) {
	        markAsRead(ntfk);	        
	    }
        
        $scope.remove = function(ntfk) {
        	spinner.show();
			notificationsProvider.remove(ntfk.id, function (res) {
	        	$scope.notifications.splice($scope.notifications.indexOf(ntfk), 1);
	        	$ionicListDelegate.closeOptionButtons();
	        	spinner.hide();
	        });
        }
        
        $scope.viewProfile = function(ntfk) {
			markAsRead(ntfk);
			if(typeof(analytics) != 'undefined') analytics.trackEvent('Profile', "viewProfile", ntfk.profile_id,"fromNotification");
			
			$state.go("tabs.profile",{'id':  ntfk.profile_id});
        }
        
        
        function markAsRead(ntfk) {
        	spinner.show();
			notificationsProvider.acknowledge(ntfk.id, function (res) {	        	
	        	$scope.notifications[$scope.notifications.indexOf(ntfk)].ack = true;
	        	User.decrNotificationsCount();
	            $ionicListDelegate.closeOptionButtons();
	            spinner.hide();

	        });	        
        }
                

    }]);
