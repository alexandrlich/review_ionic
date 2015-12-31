'use strict';

angular.module('reviyouMobileApp')
    .directive('mainMenu', [ "User", function ( User) {

        return {
            templateUrl: 'views/main-menu.html',
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                scope.menuOpened = false;
            }
        };

    }]);
