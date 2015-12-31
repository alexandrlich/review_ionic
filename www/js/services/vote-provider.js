'use strict';

angular.module('reviyouMobileApp')
    .factory('voteProvider',["defaultProvider", function (defaultProvider) {
        var urlRoot = '/vote';
		var urlVotedProfiles = '/votedProfiles';
		var urlHideVotedProfiles = '/hideVotedProfile';

        return {
            voteProfile: function (data, callback) {
                defaultProvider.create(urlRoot, {
                    body: {
                        general_vote: data.generalVote,
                        anonymous: data.anonymous,
                        is_revote : data.is_revote
                    },
                    success: callback,
                    id: data.profile_id
                });
            },
            voteProfileSkill: function (data, callback) {

                defaultProvider.create(urlRoot + '/' + data.profile_id + '/' + data.skill_id, {
                    body: {
                        vote_value: data.vote_value,
                        anonymous: data.anonymous,
                        is_revote : data.is_revote
                    },
                    success: callback
                });
            },
            getVotedProfiles: function(offset,callback) {
                var params = {
                    offset: offset
                };
                defaultProvider.fetch(urlVotedProfiles, {
                    data: {
                        params: params
                    },
                    success: function (data) {
                        callback(data);
                    }
                });
            },
            hideVotedProfile: function(id,callback) {

	             defaultProvider.update(urlHideVotedProfiles, {
	                body: {
                    },
                    id: id,
                    success: callback
                });                              
                
            }
        };
    }]);
