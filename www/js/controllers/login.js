'use strict';

angular.module('reviyouMobileApp')
    .controller('LoginCtrl', ["$rootScope","$scope", "AuthorizationService","SignupService", "userProvider", "$state","$log","$timeout","utils",function ($rootScope, $scope, AuthorizationService,SignupService, userProvider, $state,$log,$timeout, utils) {
        
     	//hide splash image here for smoother effect, not in index.html  and not in  main.js
		if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
		
		$scope.signUpObj = SignupService.initSignUpObj(); 
		$scope.forgotObj = SignupService.initResetPasswordobj();	
  		$scope.signInObj = {
	  		email:'',
	  		password:''
  		}
  		$scope.login = AuthorizationService.login;
		
  		    
  		//separate fields for smoother transition
		var mainLoginPage=true;
		var signInPage=false;
		
		$scope.showSignInPage = function() {
			return signInPage;
		}
		$scope.showMainLoginPage = function() {
			return mainLoginPage;
		}		
		
		$scope.goToReviyouSignIn = function() {
			mainLoginPage = false;
			//for smoother transition
			$timeout(function() {
				signInPage = true;
		    }, 300);
		    //set focus to username
			
		}
		$scope.goToMainLogin = function() {
			signInPage = false;			
			$timeout(function() {
				mainLoginPage = true;
		    }, 300);
		}
		
		$scope.signIn = function() {
			if(!validateEmailPassword($scope.signInObj.email,$scope.signInObj.password,$scope.signInObj.password)) {
				return;
			}
			//check password and user are entered, trim, check email valid
			AuthorizationService.login('reviyou',$scope.signInObj);
			
		}
		$scope.signUp = function() {
			$state.go('blank.signUp');
		}
		
		$scope.forgotPassword = function() {
			$state.go('blank.forgotPassword');
		}
		  			
		$scope.forgotPasswordSubmit = function() {
			if(!validateEmailPassword($scope.forgotObj.email,$scope.forgotObj.password,$scope.forgotObj.password_repeat)) {
				return;
			}
									
			SignupService.resetPass($scope.forgotObj);										
				
		}

		$scope.logout = function() {
			userProvider.logout();
	        
			$state.go("blank.login");
		}

		
		$scope.signUpSubmit = function() {
			//TODO:trim fields

			if(!validateEmailPassword($scope.signUpObj.email,$scope.signUpObj.password, $scope.signUpObj.password_repeat)) {
				return;
			}
			
			if(! ($scope.signUpObj.first_name &&
				$scope.signUpObj.last_name) ) {
				$rootScope.$broadcast("errorAlert","Validation","First or last name is missing.");
				return;
			}
			
			SignupService.register($scope.signUpObj);
				
	
		}
		
		
		function validateEmailPassword(email, password, password_repeat) {
			if(!utils.validatePassword(password)) {
				$rootScope.$broadcast("errorAlert","Password validation","Password should contain 1 uppercase, 1 lowercase letter, 1 number and be at least 6 characters long");			
				return false;
			}
			if(!utils.validateEmail(email)) {
				$rootScope.$broadcast("errorAlert","Email validation","Email you entered seems to be invalid.");
				return false;
			}
			
			if(password != password_repeat) {
				$rootScope.$broadcast("errorAlert","Validation","Please make sure password is entered correctly twice.");	
				return false;
			}
			
			return true;
			
		}

	
		
		
    }]);
