'use strict';

angular.module('reviyouMobileApp')
    .factory('skillProvider', ["$q","defaultProvider","$log",function ($q,defaultProvider,$log) {
        var urlRoot = '/skills';

        function getSkills(profileTags) {
                var dfd = $q.defer();
            	$log.debug('getSkills, query:' + profileTags);
                var params = {
                    tags: profileTags
                };
                
                
                defaultProvider.fetch(urlRoot, {
                 	data: {
                        params: params
                    },
                    success: function (data) {                        
                        dfd.resolve(data);
                    }
                });
                
                return dfd.promise
        }
 
        
        
        return {
            getSkills: getSkills            
        };
    }]);
