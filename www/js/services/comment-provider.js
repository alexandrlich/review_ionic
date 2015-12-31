'use strict';

angular.module('reviyouMobileApp')
    .factory('commentProvider',["defaultProvider", function (defaultProvider) {
        var urlRoot = '/comment';
		var urlVote = '/comment2/vote';//tmp - we need to resolve somehow difference b\w vote\unvote and create comment route
		var urlUnVote = '/comment2/unvote';

        return {
            getComments: function (profile_id, offset, callback) {
                var params = {
                    offset: offset
                };

                defaultProvider.fetch(urlRoot, {
                    data: {
                        params: params
                    },
                    id: profile_id,
                    success: callback
                });
            },
            
            removeProfileComment: function(comment_id, callback) {
	            defaultProvider.remove(urlRoot, {
                    id: comment_id,
                    success: callback
                });
                
                
            },

            addProfileComment: function (profile_id, text, callback) {
                defaultProvider.create(urlRoot, {
                    body: {
                        text: text
                    },
                    id: profile_id,
                    success: callback
                });
            },
            vote: function(comment_id, group_name,callback) {
	            defaultProvider.create(urlVote, {
                    body: {
                        group_name: group_name,
                        comment_id: comment_id
                    },
                    //id: comment_id,
                    success: callback
                });
            },            
            unvote: function(comment_id, group_name,callback) {
	            defaultProvider.create(urlUnVote, {
                    body: {
                        group_name: group_name,
                        comment_id: comment_id
                    },
                    //id: comment_id,
                    success: callback
                });
            },
        };
    }]);
