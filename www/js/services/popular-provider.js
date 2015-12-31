'use strict';

angular.module('reviyouMobileApp')
    .factory('popularProvider',["defaultProvider", "utils", "User",function (defaultProvider,utils,User) {
        var urlRoot = '/popular';
 //TODO:remove copy paste with searc-provider.js
        return {
            getPopularProfiles: function (offset, selectedTags, callback) {
                 var params = {
                    offset: offset,
                    tags: selectedTags
                };
        
                defaultProvider.fetch(urlRoot, {
                    data: {
                        params: params,
                    },
                    success: function (data) {                        
                        callback(data)
                    }
                });
            }
        };
    }]);
