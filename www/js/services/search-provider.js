'use strict';

angular.module('reviyouMobileApp')
    .factory('searchProvider', ["defaultProvider","$log","utils","User",function (defaultProvider, $log,utils,User) {
        var cachedSearchResult = [],
            urlRoot = '/search';
            //TODO:remove copy paste with popular-provider.js
	    return {
            search: function (searchQuery, callback) {
                $log.debug('search, query:' + searchQuery);
                var params = {
                    query: searchQuery,
                    tags: User.getSelectedTags().join()
                };

                defaultProvider.fetch(urlRoot, {
                    data: {
                        params: params
                    },
                    success: function (data) {                        
                        /*
                        if(data.length){
			                data.forEach(function(element) {			                
			                    element.initials = utils.nameInitials(element.name);
			                });
		                } */
                        callback(data)
                    }
                });
            }
        };
    }]);
