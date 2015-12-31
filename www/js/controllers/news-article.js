/*
'use strict';

angular.module('reviyouMobileApp')
    .controller('NewsArticleCtrl',["$scope", "newsProvider", "$stateParams",  "spinner", function ($scope, newsProvider, $stateParams, spinner) {
    	// var articleId = parseInt($routeParams.id, 10);
        var articleId = $stateParams.id;        
		spinner.show();
		//TODO: redo - we don't need to retrieve ALL news again!!!
        newsProvider.getLatestNews(function(news) {
        	spinner.hide();
            $scope.article = newsProvider.getArticleById(articleId, news);
        });
        
        
    }]);
*/