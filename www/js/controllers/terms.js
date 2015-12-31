'use strict';

angular.module('reviyouMobileApp')
    .controller('TermsCtrl', ["$scope", "$state", "User", "AuthorizationService", "userProvider","spinner", function ($scope, $state, User, AuthorizationService, userProvider,spinner) {
        function saveAgreement() {
            spinner.show();
            userProvider.saveTermsAgreement(User.getUserId(), function () {
                User.setUserData({
                    terms_signed: true
                });
            });

            //$state.go("blank.main");
            $state.go("blank.intro");
                
        }
		$scope.isAccepted =  User.getUserValue('terms_signed');
		
        $scope.agree = function (agreement) {
            if (!agreement) {
            	if(typeof(analytics) != 'undefined') analytics.trackEvent('Category1', 'Terms&Conditions', 'NotAgree');
				
                spinner.hide();
				userProvider.logout();
				$state.go("blank.login");
                return;
            }

            saveAgreement();
        }

    }]);
