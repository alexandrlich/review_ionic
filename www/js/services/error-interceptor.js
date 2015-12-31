'use strict';

angular.module('reviyouMobileApp')
    .provider('errorInterceptor', function () {
        
        var _errors = {
            '500': function ($state) {
            	$state.go('tabs.error',{'code':'500'});   
            },
            '401': function ($state) {
            	$state.go('tabs.error',{'code':'401'});   
            },
            '403': function ($state) {
            	$state.go('tabs.error',{'code':'403'});
            },
            '404': function ($state) {
            	$state.go('tabs.error',{'code':'404'}); 
            },
            'request': function ($state) {
            	$state.go('tabs.error',{'code':'request'});  
            },
            'timeout': function ($state, $rootScope) {
		$rootScope.$broadcast("errorAlert","Server timeout","Our servers are currently overloaded, please try again later.");
            }
        },
            NO_INTERNET = "NO_INTERNET_REQUEST";

			/**
			status is a http errro code or out custom error code
			if it's our custom - it would also have an error message
			*/
        function errorResponseInterceptor (status, state, error_message,$rootScope) {
            var errorHandler;
            	if(_errors.hasOwnProperty(status)) {
	            errorHandler = _errors[status];
				errorHandler(state, $rootScope);
			} else {
	           state.go('tabs.errorWithMessage',{"code":status, "customMessage":error_message}); 
			}
        }

		interceptorsConfig.$inject = ["$q", "$injector", "$log", "utils","spinner","$rootScope"];
        function interceptorsConfig ($q, $injector, $log, utils,spinner,$rootScope) {
			
            return {
            	//1.don't fire external request if there is no internet
            	//2.added timeout for all requests
            	request: function (config) {
	                //$log.debug('request interc ' + JSON.stringify(config));
               		if ((navigator && navigator.network && navigator.network.connection.type === Connection.NONE)
				   	    && (config.url.substring(0, 5) === "https")) {
				   	    	//if external request and no connection
				   			$rootScope.$broadcast("errorAlert","Warning","No Internet connection");
				        	config.data = NO_INTERNET;

				        return $q.reject(config);
				    } else {
				        config.timeout = 20000; //timeout for all requests = 15 for the slow internet sec
						
						return config || $q.when(config);
				    }


                },

                requestError: function (rejection) {
               		spinner.hide();
               		errorResponseInterceptor('request',
                            $injector.get('$state'),'',$rootScope);
                    return $q.reject(rejection);
                },

                response: function (response) {
	                //$log.debug('res intercept ' + JSON.stringify(response));
               		
	                //$log.debug('response.data.status' + response.data.status>0)
                    if (response.data && response.data.status>0) {//if custom error passed fom BE
                    	$log.debug('res custom error ' + JSON.stringify(response.data.status));
						//put this condition inside of errorResponseInterceptor
               		    spinner.hide();
               		    
               		    //TODO:move to another place for cleaner code
               		    if(response.data.status==10008) {//duplicated profile, no need to show error page, just alert
               		    	//without email approval
               		    	//$rootScope.$broadcast("errorAlert","Validation Problem","Profile with such name, email and occupation already exist, please search for it or create another profile with unique email address.");
               		    	$rootScope.$broadcast("errorAlert","Validation Problem",response.data.error_message);

               		    } else if(response.data.status==10017) {//sign in error, no need to show error page, just alert
               		    	$rootScope.$broadcast("errorAlert","Validation Problem",response.data.error_message);

               		    }  else {//custom errror with no validation
               		    	errorResponseInterceptor(response.data.status,
                            $injector.get('$state'), response.data.error_message, $rootScope);
                        } 
                    }

                    return response || $q.when(response);
                },

				//intercept all http errors
                responseError: function (rejection) {
               		$log.debug('res Error ' + JSON.stringify(rejection));
			   		spinner.hide();
               		
                	if (rejection.status === 0) {//timeout error
                    	errorResponseInterceptor('timeout',
                            $injector.get('$state'),'',$rootScope);
                    } else {
                    	if(NO_INTERNET === rejection.data) {
	                    	//do nothing, stay where we are
                    	} else {
                    	//http error: for example 500 internal service error
                    		errorResponseInterceptor(rejection.status,
                            	$injector.get('$state'),'',$rootScope);//navigate to error page
                        }
                    }

                    return $q.reject(rejection);
                }
            };
        };

        return {
            initialize: function ($httpProvider) {
            	$httpProvider.interceptors.push(interceptorsConfig);
            },

            $get: function errorInterceptorFactory () {
                return new errorInterceptor();
            }
        };
    });

