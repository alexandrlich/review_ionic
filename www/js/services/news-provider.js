/*
'use strict';

angular.module('reviyouMobileApp')
    .factory('newsProvider',["defaultProvider", function (defaultProvider) {
        var urlRoot = '/news';
		var urlRecentNewsExist = '/news/check_recent';

        var news;

        return {
            getLatestNews: function(callback) {
                defaultProvider.fetch(urlRoot, {
                    success: function (data) {
                        callback(data);
                    }
                });
            },
            
            checkRecentNewsExist: function(callback) {
                defaultProvider.fetch(urlRecentNewsExist, {
                    success: function (data) {
                        callback(data);
                    }
                });
            },

            getArticleById: function (id, news) {
                var result;

                angular.forEach(news, function (article) {
                    if (!result && article.id === id) {
                        result = article;
                    }
                });

                return result || {};
            }
        };
    }]);

*/