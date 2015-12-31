/*
'use strict';

angular.module('reviyouMobileApp')
    .controller('NewsCtrl', ["$scope", "newsProvider","spinner", "$state",function ($scope, newsProvider,spinner, $state) {
    	
    	
        spinner.show();
        newsProvider.getLatestNews(function (res) {
        	spinner.hide();
            $scope.news = res;
        });
    }]);
*/