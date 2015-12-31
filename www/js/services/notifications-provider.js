'use strict';

angular.module('reviyouMobileApp')
    .factory('notificationsProvider',["defaultProvider", function (defaultProvider) {
        var urlRoot = '/notifications';
		
		var urlAck = '/notifications/ack';
		var remove = '/notifications/remove';

		var urlNewNotificationsCount = '/notifications/newCount';

        
        return {
            getNotifications: function(offset,callback) {
                var params = {
                    offset: offset
                };
                defaultProvider.fetch(urlRoot, {
                    data: {
                        params: params
                    },
                    success: function (data) {
                        callback(data);
                    }
                });
            },
            
            acknowledge: function(id, callback) {
   
   	            defaultProvider.update(urlAck, {
   	                body: {
                    },
                    id: id,
                    success: callback
                });
            },
             remove: function(id, callback) {
	             defaultProvider.remove(remove, {
                    id: id,
                    success: callback
                });
            },           
  
            checkRecentNotificationsCount: function(callback) {
                defaultProvider.fetch(urlNewNotificationsCount, {
                    success: function (data) {
                        callback(data);
                    }
                });
            }
        };
    }]);
