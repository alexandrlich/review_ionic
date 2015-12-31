'use strict';

angular.module('reviyouMobileApp')
    .factory('SignupService', ["$state", "$timeout","$rootScope", "defaultProvider", "appConfig",   "$log","spinner", function ($state, $timeout,$rootScope, defaultProvider, appConfig,  $log,spinner) {


      
        
	var signUpForm = {
	  	first_name: "",
	    last_name: "",
	    email: "",
	    password: "",
	    password_repeat: ""
	};
	
	var resetPassForm =  {
			email:"",
			password:"",
			password_repeat:""
	};
        
        function signUpResponseHandler(response) {
       				
	        if(response.status>0){
	        	$log.error("response.status:"+response.status); 
				$rootScope.$broadcast("errorAlert","Problem during signUp",response.error_message);
	        } else {
	        	$state.go("blank.signUpSubmitted");
			}     
	        //if email exist with reviyou type - show a different screen
	        //otherwise:
	    }
        
        function resetPassResponseHandler(response) {
	        if(response.status>0){
		        $log.error("response.status:"+response.status); 
				$rootScope.$broadcast("errorAlert","Problem during reset",response.status + ":"+response.error_message);

	        } else {
	        	$state.go("blank.forgotPasswordSubmitted");
			}
        }

            
        return {
          
            register: function (sUpForm) {
            		spinner.show();
					if(typeof(analytics) != 'undefined') analytics.trackEvent('Login', "Register", sUpForm.email);
    	
            		defaultProvider.create('/signup', {
		                body: sUpForm,
		                withoutAuthData: true,
		                success: function (data) {
		                	spinner.hide();
		                    signUpResponseHandler(data);                    
		                }
					});
			},
			
			resetPass: function(resPassForm) {
				spinner.show();
				if(typeof(analytics) != 'undefined') analytics.trackEvent('Login', "Reset", resPassForm.email);
    	
            		defaultProvider.create('/resetPassword', {
		                body: resPassForm,
		                withoutAuthData: true,
		                success: function (data) {
		                	spinner.hide();
							resetPassResponseHandler(data);                    
		                }
					});				
			},
	        
	        initSignUpObj: function() {
		         return angular.copy(signUpForm);				
	         },
	         
	         initResetPasswordobj: function() {
		         return angular.copy(resetPassForm);
	         }
                  
         
            
        };
    }]);
