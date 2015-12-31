'use strict';

angular.module('reviyouMobileApp')
    .factory('appConfig', function () {
    
    	
        var config = {
            //if you point directly to app server it will not show\store images properly
            //apiHost: "http://192.168.1.5:8080/api/1.1/rest",
            apiHost: "https://api.reviyou.com/api/1.2.2/rest",
             //apiHost: "http://192.168.1.3:9000/api/1.2.2/rest",
            //local with ionic serve
            //apiHost: "http://127.0.0.1:9000/api/1.2.2/rest",
            //apiHost: "http://172.22.7.208:9000/api/1.2.2/rest",
            
            fbAppId: 731640560179788,
            
            ryAppId: "731640560179700",
            
            analyticsKey: "UA-61578002-4",//before we used UA-61578002-1
            
            analyticsDebugMode: false,//should never be false on dev!
            
            
            googleParams: {
            	//new prod config
                client_id: "978856174959-kuo3hm532kc2r592khmc2s8qb5n76mhn.apps.googleusercontent.com",
                client_secret: "FlF9V8Sypw5jsZnMgmra1pLh",

                //old qa config for google plus
                //client_id: "550355113160-k6i2fnjjfvf29eu3lfots6uk43q9opfb.apps.googleusercontent.com",
                //client_secret: "1h9Da-KCoiTV1N8N_n3jBvOE",
                redirect_uri: 'http://localhost',
                scope: 'https://www.googleapis.com/auth/userinfo.profile email',
                
                //prod push notifications
                project_id: "978856174959"//,//sender_id
                //api_key: "AIzaSyDFXpmCKG0yW_Rvv4Rl4dXJEhdif-fZmIU"
                
            },
            oAuthIOPublicKey: 'cFvVKe81P5mP6eygHE-UrIUYv10'//for twitter
            //old
            //200Tj2so1v9V7DmRARzFj24cXZs
            
        };
        return {
            getAppConfig: function () {
                return config;
            }
        };
    });

