'use strict';

angular.module('reviyouMobileApp')
    .factory('userProvider',["defaultProvider","User", function (defaultProvider, User) {
        var urlRoot = '/user';

        return {
            saveTermsAgreement: function (id, callback) {
                defaultProvider.create(urlRoot + '/' + id + '/terms_signed', {
                    success: callback
                });
            },

            logout: function () {
            	if(User.getUserId() && User.getAuthToken()) {
	                defaultProvider.fetch('/logout', {
	                    success: User.clearUserData,
	                    error:  User.clearUserData
	                });
                } else {
	                User.clearUserData
                }
            },
            
            selectTag: function(user_id, tag_name, callback) {
				defaultProvider.create(urlRoot + '/'+user_id+'/addTag', {
                    body: {
                    	tag_name: tag_name
                    },
                    success: callback
                });           
            },
            /*
            deselectTag: function(user_id, tag_name, callback) {
				defaultProvider.create(urlRoot + '/'+user_id+'/removeTag', {
                    body: {
                    	tag_name: tag_name
                    },
                    success: callback
                });           
            },*/
            
            //deletes 1 or multiple tags(if many - separate by ","
             deselectTags: function(user_id, tag_names, callback) {
				defaultProvider.create(urlRoot + '/'+user_id+'/removeTags', {
                    body: {
                    	tag_names: tag_names
                    },
                    success: callback
                });           
            },
            
            //todo: merge with saveFollowSetting
            saveSoundSetting: function(user_id, newValue, callback) {
				defaultProvider.create(urlRoot + '/'+user_id+'/changeSettings', {
                    body: {
                    	settingName:"soundPreference",
                    	settingValue:newValue
                    },
                    success: callback
                });           
            },
            //todo: merge with saveSoundSetting
            saveFollowSetting: function(user_id, newValue, callback) {
				defaultProvider.create(urlRoot + '/'+user_id+'/changeSettings', {
                    body: {
                        settingName:"followingPreference",
                    	settingValue:newValue
                    },
                    success: callback
                });           
            }        
          
        };
    }]);
