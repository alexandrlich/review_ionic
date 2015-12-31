'use strict';
angular.module('reviyouMobileApp')
    .factory('spinner', ["$log","$injector",function ($log,$injector) {
        return {
			
			show: function (content) {
				$log.debug('showspinner');
				var spinnerHtml = '<ion-spinner></ion-spinner>';
				$injector.get("$ionicLoading").show({
				    template: spinnerHtml + (content|| 'Loading'),
				    
				    
				    animation: 'fade-in',
			        noBackdrop:false,
			        showDelay: 100,
			        duration:2000000 //just to avoid blocking user forever
				  })
				
				//if(typeof(spinnerplugin) != 'undefined') return spinnerplugin.show;
				return;
			},
			hide: function () {
				$log.debug('hidespinner');
				//if(typeof(spinnerplugin) != 'undefined') return spinnerplugin.hide;
				$injector.get("$ionicLoading").hide()
				return;
			}
		
        };
    }]);
