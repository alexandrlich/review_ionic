'use strict';

angular.module('reviyouMobileApp')
    .factory('professionProvider', ["defaultProvider", function (defaultProvider) {
        var urlRoot = '/professions';

        return {
            getProfessions: function (callback) {
                defaultProvider.fetch(urlRoot, {
                    success: callback
                });
            }
        };
    }]);
