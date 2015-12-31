'use strict';

angular.module('reviyouMobileApp')
    .factory('deviceInfo', ["$log",function ($log) {
        return {
            getDeviceInfo: function () {
                $log.debug('start getting device info ' + device.model);
                return {
                	model: device.model,
                    uuid: device.uuid,
                    version: device.version,
                    platform: device.platform
                };
            }
        };
    }]);
