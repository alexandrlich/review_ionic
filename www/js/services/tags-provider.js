'use strict';

angular.module('reviyouMobileApp')
    .factory('tagsProvider',["defaultProvider", function (defaultProvider) {
        var urlRoot = '/tags';
        
	    return {
            getTags: function (offset, callback) {
             		var params = {
                    	offset: offset
					};
                    defaultProvider.fetch(urlRoot, {
                    data: {
                        params: params
                    },
                    success: callback
                });
            },
            
            search: function (startsWith, callback) {
             	var params = {
                    query: startsWith
				};        
                defaultProvider.fetch(urlRoot + '/search', {
                    data: {
                        params: params
                    },
                    success: callback
                });
            }
            
   
        };
    }]);
