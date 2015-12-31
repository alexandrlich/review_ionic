'use strict';
angular.module('reviyouMobileApp')
    .directive('profilepic', ['$compile', function ($compile) {
        function defaultPicture(/*$scope,*/element,initials) {
                var html ='<div class="no-photo"><span class="letters">'+initials+'</span></div>';
				
				
				//var e =$compile(html)($scope);
				//element.replaceWith(e);
				element.replaceWith(html);

	        }
	        
        function resizeImage(element, value,keepRatio) {
               		
				if(keepRatio=="true") {
					element.find('img').css('max-width', value + "px");
					element.find('img').css('max-height', value + "px");
				} else {
					element.find('img').css('width', value + "px");
					element.find('img').css('height', value + "px");
				}

	        }	        
        
        return {
            restrict: 'E',
            //keep ratio would not resize to the circle
	        scope: { initials: '@', src:'@', keepRatio:'='},
	        template: '<div class="no-photo"><img /></div>',//circle
	       
	        replace: true,
	        
	        // observe and manipulate the DOM
	        link: function($scope, element, attrs) {
		        
	            if(attrs.src) {
	              	element.find('img').attr('src', attrs.src);
	            } else {//no url exist
	            	defaultPicture(element,attrs.initials);
		        }

				element.find('img').bind('error', function() {//image not loaded
					defaultPicture(element,attrs.initials);
				}); 
	            element.find('img').bind('load', function() {
	            		if(attrs.keepRatio=="true") {//oval on profile page if url is valid
							var templateObj = $compile('<img src="'+attrs.src+'" />')($scope);
							element.replaceWith(templateObj);
							
							element.find('img').css('display', "block");
							element.find('img').css('width', "auto");
							element.find('img').css('height', "auto");
						}
	            
                	resizeImage(element, element.prop('offsetWidth'),attrs.keepRatio);
				});
	        }
	        
		};

    }]);
    
  