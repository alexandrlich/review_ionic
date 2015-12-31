'use strict';

angular.module('reviyouMobileApp')
    .factory('defaultProvider', ['$http', 'utils', 'User', '$log',function ($http, utils, User, $log) {
        var depth = 3,
            METHODS = {
                DELETE: "DELETE",
                POST: "POST",
                GET: "GET",
                PUT: "PUT"
            },
            _customCheckHandlers = {
                "POST": function (options) {
                    options.body = options.body || {};

                    return options;
                },
                "GET": function (options) {
                    options.data.params = options.data.params || {};

                    return options;
                },
                "DELETE": function (options) {
                    options.data.params = options.data.params || {};

                    return options;
                },
                "DEFAULT": function (options) {
                    return options;
                }
            };

        function _makeUrl(urlRoot, options) {
            var id = (options.id && '/' + options.id) || '';
            return urlRoot + id;
        }
		
	    function _checkDefault (options, method) {
	    	var customHandler = _customCheckHandlers[method];

            if(!customHandler) {
                customHandler = _customCheckHandlers.DEFAULT;
            }

            options = options || {};

            options.data = options.data || {};

            options.success = options.success || _onSuccess;
            options.error = options.error|| _onError;

            return customHandler(options);
        }

		//default success handler
        function _onSuccess () {
            $log.log('request successfully handled');
        }

		//default error handler
        function _onError (data, status, headers, config) {
            $log.error('exception: ' + data + ' status: ' + status + ' headers: ' + headers);
        }
  

        function _parseId (data) {
            if (angular.isObject(data) && data._id && !data.id) {
                data.id = data._id;
                delete data._id;
            }

            // if data is an array like:
            // [{_id: 1}, {_id: 2}]
            // an depth not less 1(avoiding run time error),
            // should invoke parseId function on each element of array
            if (angular.isArray(data) && depth > 0) {
                depth--;
                angular.forEach(data, _parseId);
            }

            // set depth of parsing steps to default again
            depth = 3;
            return data;
        }

        function _parse (data) {
            return _parseId(data);
        }

        function _getUserAuth () {
            return {
                user_id: User.getUserId(),
                user_token: User.getAuthToken()
            }
        }

		function create (urlRoot, options) {
            var url = _makeUrl(urlRoot, options);

            options = _checkDefault(options, METHODS.POST);

            if (!options.withoutAuthData) {
                angular.extend(options.body, _getUserAuth());
            }

			$http.post(utils.apiUrl(url), options.body, options.data)
                .success(function (response) {
					
                    if (response.status === 0) {
                   		_parse(response.data);
				   		options.success(response.data, response);
                    } else {
                    	options.error(response, response);
                    }
                })
                .error(options.error);
        }

        function update (urlRoot, options) {
			var url = _makeUrl(urlRoot, options);
            options = _checkDefault(options, METHODS.PUT);
			//add null check
			//angular.extend(options.data.params, _getUserAuth());
			angular.extend(options.body, _getUserAuth());
    
            $http.put(utils.apiUrl(url), options.body)
                .success(function (response) {
                   
                    if (response.status === 0) {
                        _parse(response.data);
                        options.success(response.data, response);
                    }
                })
                .error(options.error);            
        }

        function remove (urlRoot, options) {
            var url = _makeUrl(urlRoot, options);

            options = _checkDefault(options, METHODS.DELETE);
            angular.extend(options.data.params, _getUserAuth());
    
            $http.delete(utils.apiUrl(url), options.data)
                .success(function (response) {
                   
                    if (response.status === 0) {
                        _parse(response.data);
                        options.success(response.data, response);
                    }
                })
                .error(options.error);
        }

        function fetch (urlRoot, options) {
            var url = _makeUrl(urlRoot, options);

            options = _checkDefault(options, METHODS.GET);
            angular.extend(options.data.params, _getUserAuth());
		    $http.get(utils.apiUrl(url), options.data)
                .success(function (response) {
                
                    if (response.status === 0) {
                        _parse(response.data);
                        options.success(response.data, response);
                    }
                    //TODO: else??
                })
                .error(options.error);
        }

        return {
            create: create,
            fetch: fetch,
            remove: remove,
            update: update
        };
    }]);
