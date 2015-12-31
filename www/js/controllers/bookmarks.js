'use strict';

angular.module('reviyouMobileApp')
    .controller('BookmarksCtrl', ["$scope", "$rootScope", "bookmarkProvider", "$log","spinner","utils",function ($scope, $rootScope, bookmarkProvider, $log,spinner,utils) {
        
        
        $scope.bookmarks = [];
        $scope.noResults = false;//for empty list message

		spinner.show();            
        bookmarkProvider.getBookmarkedProfiles(function (res) {
            $scope.bookmarks.splice(0, $scope.bookmarks.length);
                          
            angular.forEach(res, function (item) {
                $scope.bookmarks.push(angular.extend(item, {bookmarked: true}));
            });     
            
            if($scope.bookmarks.length==0) {
	        	$scope.noResults = true;
	        }       
            spinner.hide();
            
        });
        
        $scope.deleteBookmark = function(bookmarkId) {
			$rootScope.$broadcast("deleteConfirm", function() {
		        spinner.show();
	            bookmarkProvider.unBookmarkProfile(bookmarkId, function () {
	            	for (var i = 0; i < $scope.bookmarks.length; i++) {
	                    if ($scope.bookmarks[i].id === bookmarkId) {
	                        $scope.bookmarks.splice(i, 1);
							break;
	                    }
	                }
	                spinner.hide();            
				});
         	});	
		}  
        
        
        $rootScope.$on('deleteBookmark', function (e,bookmarkId) {
        	$log.debug('bookmarkToDelete Id: ' + bookmarkId);
        	spinner.show();
            bookmarkProvider.unBookmarkProfile(bookmarkId, function () {
            	for (var i = 0; i < $scope.bookmarks.length; i++) {
                    if ($scope.bookmarks[i].id === bookmarkId) {
                        $scope.bookmarks.splice(i, 1);
						break;
                    }
                }
                spinner.hide();
            
            });
        });
    }]);
