'use strict';

angular.module('reviyouMobileApp')
    .factory('contactProvider', ["defaultProvider", function (defaultProvider) {
        var urlRoot = '/feedback';

        return {
            postFeedback: function (data, callback) {
                defaultProvider.create(urlRoot, {
                    body: {
                            subject: data.subject,
                            description: data.description
                    },
                    success: callback
                });
            }
        };
    }]);
