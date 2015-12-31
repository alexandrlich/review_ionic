'use strict';

angular.module('reviyouMobileApp')
    .factory('requestProvider', ["defaultProvider", function (defaultProvider) {
        var urlRoot = '/request/profile';

        return {
            addJobRequest: function (profile_id, jobData, callback) {
                defaultProvider.create(urlRoot + '/' + profile_id + '/job', {
                    body: jobData,
                    success: callback
                });
            },

            addCustomSkillRequest: function (profile_id, skillName, callback) {
                defaultProvider.create(urlRoot + '/' + profile_id + '/skill', {
                    body: {
                        skill_name: skillName
                    },
                    success: callback
                });
            },

            deleteProfileRequest: function (profile_id, callback) {
                defaultProvider.create('/request/delete_profile/' + profile_id, {
                    body: {
                        profile_id: profile_id
                    },
                    success: callback
                });
            }
        };
    }]);
