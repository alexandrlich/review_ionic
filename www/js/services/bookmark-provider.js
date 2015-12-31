'use strict';

angular.module('reviyouMobileApp')
    .factory('bookmarkProvider', ["defaultProvider", function (defaultProvider) {
        var urlRoot = '/bookmark/profile';

        return {
            bookmarkProfile: function (profile_id, callback) {
                defaultProvider.create(urlRoot + '/' + profile_id, {
                    success: callback
                });
            },
            unBookmarkProfile: function (profile_id, callback) {
                defaultProvider.remove(urlRoot, {
                    id: profile_id,
                    success: callback
                });
            },
            getBookmarkedProfiles: function (callback) {
                defaultProvider.fetch('/bookmark', {
                    success: callback
                });
            }
        };
    }]);
