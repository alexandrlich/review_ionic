'use strict';

angular.module('reviyouMobileApp')
    // Set the whitelist for certain URLs just to be safe
//  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//,"profileProvider"
    .config(["$urlRouterProvider","$stateProvider","errorInterceptorProvider","$httpProvider","$logProvider","$ionicConfigProvider",function ($urlRouterProvider, $stateProvider, errorInterceptorProvider, $httpProvider, $logProvider,$ionicConfigProvider) {
    //profileProvider
    //todo add  $locationProvider.html5Mode(true)
    
    //local
    $logProvider.debugEnabled(false);
    
    //$logProvider.debugEnabled(utils.getLoggerDebugMode());
    ///////////
	 //if(!ionic.Platform.isIOS()) 
	 //$ionicConfigProvider.scrolling.jsScrolling(false);
	///////////
	
	//swipe back doesn't work with not cached views
	//http://forum.ionicframework.com/t/turn-off-swipe-go-back-feature/17777/3
	//https://github.com/driftyco/ionic/issues/3317
	$ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back');
	//TODO: disable cache completely and make sure go back performance is not hurt!
	//setting to 0 will also disable caching of the views
	$ionicConfigProvider.views.maxCache(10);


   $stateProvider
    .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
    })
    
    
    .state('tabs.popular', {//currently this is a home page
        url: "/popular",
        views: {
            'home-tab': {
                templateUrl: "views/popular.html",
                controller: 'PopularCtrl'
                
             },
            'blank-tab': {
                templateUrl: "views/popular.html",
                controller: 'PopularCtrl'
             }
            
        }
    })
    .state('tabs.popularByTag', {//currently this is a home page
        url: "/popular/:tagName",
        views: {
            'home-tab': {
                templateUrl: "views/popular.html",
                controller: 'PopularCtrl'
                
             }
            
        }
    })    
    
    .state('tabs.search', {
        url: "/search",
        views: {
            'home-tab': {
                templateUrl: "views/search.html"
             }
        }
    })    
    .state('tabs.searchString', {
        url: "/search/:searchString",
        views: {
            'home-tab': {
                templateUrl: "views/search.html"
             }
        }
    })   
    .state('tabs.votedprofiles', {
        url: "/votedprofiles",
        views: {
            'home-tab': {
                templateUrl: "views/voted-profiles.html",
                controller: 'VotedProfilesCtrl'
            }
        }
    }) 
    
   .state('tabs.notifications', {
        url: "/notifications",
        views: {
            'home-tab': {
                templateUrl: "views/notifications.html",
                controller: 'NotificationsCtrl'
            }
        }
    })    .state('tabs.news', {
        url: "/news",
        views: {
            'home-tab': {
                templateUrl: "views/news.html",
                controller: 'NewsCtrl'
            }
        }
    }) 
    .state('tabs.singlenews', {
        url: "/news/single/:id",
        views: {
            'home-tab': {
                templateUrl: "views/news-article.html",
                controller: 'NewsArticleCtrl'
            }
        }
    })
   
    .state('tabs.bookmarks', {
        url: "/bookmarks",
        views: {
            'home-tab': {
                templateUrl: "views/bookmarks.html",
                controller: 'BookmarksCtrl'
            }
        }
    }) 
     .state('tabs.profile', {
        url: "/profile/:id",
        views: {
            'home-tab': {
                templateUrl: "views/profile.html",
                controller: 'ProfileCtrl',
             }
        },
        resolve : {
            profileDetails : function(profileProvider,$stateParams,spinner) {
            	spinner.show();	
            	return profileProvider.getProfile($stateParams.id);
            }
        }
        
               
    })
    .state('tabs.profileCreate1', {
        url: "/profile/create1",
        views: {
            'home-tab': {
                templateUrl: "views/createprofile1.html"
             }
        }
    })
    .state('tabs.profileCreate2', {
        url: "/profile/create2/:loadProfession",
        views: {
            'home-tab': {
                templateUrl: "views/createprofile2.html"
             }
        }
    })
    .state('tabs.profileCreate3', {
        url: "/profile/create3",
        views: {
            'home-tab': {
                templateUrl: "views/createprofile3.html"
             }
        }
    })    
    .state('tabs.addSkill', {
        url: "/profile/addSkill/:id/:profileTags",
        views: {
            'home-tab': {
                templateUrl: "views/add-skill-popup.html",
                controller: 'ProfileSkillsCtrl',
             }
        },
        resolve : {
            allowedSkills : function(skillProvider,$stateParams,spinner) {
            	spinner.show();	
            	return skillProvider.getSkills($stateParams.profileTags);
            }
        }
        
        
    })           
    .state('tabs.addJob', {
        url: "/profile/addJob/:id/:isRequest",
        views: {
            'home-tab': {
                templateUrl: "views/add-job.html"
             }
        }
    })      
    .state('tabs.contact', {
        url: "/contact-us",
        views: {
            'home-tab': {
                templateUrl: "views/contact-us.html"
             }
        }
    })
    .state('tabs.settings', {
        url: "/settings",
        views: {
            'home-tab': {
                templateUrl: "views/settings.html",
                controller: 'SettingsCtrl'
             }
        }
    })    
    
     .state('tabs.signterms', {
        url: "/signterms",
        views: {
            'home-tab': {
                templateUrl: "views/signterms.html"
             }
        }
    })      
     .state('tabs.viewterms', {
        url: "/viewterms",
        views: {
            'home-tab': {
                templateUrl: "views/viewterms.html"
             }
        }
    })  
  
    .state('blank.intro', {
        url: "/intro",
        views: {
            'home-tab': {
                templateUrl: "views/intro.html",
                controller: 'IntroCtrl'
             },'blank-tab': {
                templateUrl: "views/intro.html",
                controller: 'IntroCtrl'
             }
        }
    })
    .state('tabs.viewselectedtags', {
        url: "/viewselectedtags",
        views: {
            'home-tab': {
                templateUrl: "views/view-selected-tags.html",
                controller: 'ViewSelectedTagsCtrl'
             }
        }
    })    
    .state('tabs.addtags', {
        url: "/addtags",
        views: {
            'home-tab': {
                templateUrl: "views/add-tags.html",
                controller: 'AddTagsCtrl'
             }
        }
    })     ///////// another abstract state with back button and no left menu
    //that works. TODO: remove blank appender we don't need so it should not be abstract state at all
    .state('blank', {
        url: "/blank",
        abstract: true,
        templateUrl: "blank.html"
    })
    .state('blank.login', {
        url: "/login",

        views: {
            'blank-tab': {
                templateUrl: "views/authorization/login.html",
                controller: 'LoginCtrl'
            },
            'home-tab': {
                templateUrl: "views/authorization/login.html",
                controller: 'LoginCtrl'
            }
        }
    }) 
    .state('blank.signUp', {
       url: "/signUp",
       views: {
            'blank-tab': {
                templateUrl: "views/authorization/signUp.html",
                controller: 'LoginCtrl'
            }
        }
    })   
    .state('blank.signUpSubmitted', {
       url: "/signUpSubmitted",
       views: {
            'blank-tab': {
                templateUrl: "views/authorization/signUpSubmitted.html"
             }
        }
    }) 
    .state('blank.forgotPassword', {
       url: "/forgotPassword",
       views: {
            'blank-tab': {
                templateUrl: "views/authorization/forgotPassword.html",
                controller: 'LoginCtrl'
            }
        }
    })
     .state('blank.forgotPasswordSubmitted', {
       url: "/forgotPassword",
       views: {
            'blank-tab': {
                templateUrl: "views/authorization/forgotPasswordSubmitted.html"
            }
        }
    })   
    
        
    .state('blank.main', {
        url: "/main",
        views: {
            'home-tab': {
                template: '',
                controller: 'MainCtrl'
            }, 
            'blank-tab': {
                template: '',
                controller: 'MainCtrl'
            }
        }
    })   
    .state('tabs.error', {
        url: "/error/:code",
        views: {
            'home-tab': {
                templateUrl: "views/error-page.html"
            },
            'blank-tab': {
                templateUrl: "views/error-page.html"
            }
        }
    }) 
    .state('tabs.errorWithMessage', {
        url: "/error/:code/:customMessage",
        views: {
            'blank-tab': {
                templateUrl: "views/error-page.html"
             },
            'home-tab': {
                templateUrl: "views/error-page.html"
            }            
        }
    }) 


  
     //used at the very beginning when we start our work(don't use login because we have interceptor for login in run.js, but if localstorage has login data we should navigate directly to main
        
    $urlRouterProvider

			.otherwise("/blank/main");           
		//TODO: rename to requestInterceptor
        errorInterceptorProvider.initialize($httpProvider);
    }])
    
    
    
     
