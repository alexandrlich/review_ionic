'use strict';

//this is actual mocks when be-mocks needs to be here because of this file
 //this module is needed when we have mocks only. bower install currently has angular-mocks 
        //only as devDependency(i.e. not for prod, for tests only). in order to enable it - add it to
        //dependencies in bower.json, do bower install followed by the full build and uncomment module:
        //'ngMockE2E',

//not used on prod system
/*
angular.module('reviyouMobileApp')
    .factory('Mocks', function ($httpBackend, utils) {
        return {
        
             initPassThrough: function() {//call real services
	               $httpBackend.whenPOST(/.* /).passThrough();
				   $httpBackend.whenGET(/.* /).passThrough();
				   $httpBackend.whenDELETE(/.* /).passThrough();
				   $httpBackend.whenJSONP(/.* /).passThrough();
				   	             
             },         
              
            initMocks: function () {//mocks
				$httpBackend.whenJSONP(/.* /).passThrough();
				
                var loginResponse = {
                        userId: "539fd0f43c00003c006a11fc", user_image_url: "http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg"
                    },

                    bookmarksResponse = [
                        {profileId: 20, firstName: 'Ivan', lastName: 'Taliban', latestPosition: 'worker', email: 'email@email.com', generalRate: 80, theme_name: "1"},
                        {profileId: 21, firstName: 'Petro', lastName: 'Vetrov', latestPosition: 'worker', email: 'email@email.com', generalRate: 82, theme_name: "1"},
                        {profileId: 22, firstName: 'Sergey', lastName: 'Kozlov', latestPosition: 'worker', email: 'email@email.com', generalRate: 84, theme_name: "1"}
                    ],

                    reviews = [
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'},
                        {id: 0, text: 'bla bla bla bla bla bla bla bla bla bla', author: 'Rashid Abdul Petrov', user_image_url: 'http://www.beliefnet.com/columnists/cosmiccandor/files/2012/07/lion-roar.jpg'}
                    ],

                    latestNews = [
                        {
                            id: 1,
                            title: 'news 1',
                            content: 'news 1 news 1 news 1 news 1 news 1 news 1 news 1 news 1 news 1 news 1 ',
                            date: 1399237200000
                        },
                        {
                            id: 2,
                            title: 'news 2',
                            content: 'news 2 news 2 news 2 news 2 news 2 news 2 news 2 news 2 news 2 news 2 ',
                            date: 1396645200000
                        },
                        {
                            id: 3,
                            title: 'news 3',
                            content: 'news 3 news 3 news 3 news 3 news 3 news 3 news 3 news 3 news 3 news 3 ',
                            date: 1399003395000
                        },
                        {
                            id: 4,
                            title: 'news 4',
                            content: 'news 4 news 4 news 4 news 4 news 4 news 4 news 4 news 4 news 4 news 4 ',
                            date: 1398718800000
                        }
                    ],

                    profileInfo = {
                        id: 1,
                        name: 'Abdula Ivanov',
                        email: 'abdula.ivanov@mosque.com',
                        general_average_rank: 90,
                        general_vote: 2,
                        isRemovable: false,
                        theme_name: "1",
                        jobs: [
                            {
                                company: 'Muslim Internatinal Inc',
                                position: 'Shahid',
                                yearIn: 2011,
                                yearOut: 2012
                            },
                            {
                                company: 'Muslim Internatinal Inc',
                                position: 'Senior Shahid',
                                yearIn: 2012,
                                yearOut: 2013
                            }
                        ],
                        skills: [
                            {id: 0, skill_name: 'Accurate', average_rank: 86, vote_value: 3},
                            {id: 1, skill_name: 'Adoptable', average_rank: 72, vote_value: 4},
                            {id: 2, skill_name: 'Ambitious', average_rank: 90, vote_value: 5},
                            {id: 3, skill_name: 'Accurate', average_rank: 86, vote_value: 6},
                            {id: 4, skill_name: 'Adoptable', average_rank: 72, vote_value: 7},
                            {id: 5, skill_name: 'Ambitious', average_rank: 90, vote_value: 8}
                        ]
                    },

                    newProfile = {
                        id: 2
                    },
                    newProfileInfo = {
                        first_name: 'Abdula', 
                        last_name: 'Ivanovitch',
                        email: 'abdula.ivanov@mosque.com',
                        createdByUser: true,
                        id: 3,
                        general_vote: undefined,
                        general_rate: 80,
                        theme_name: "1",
                        jobs: [
                            {
                                company: 'Muslim Internatinal Inc',
                                position: 'Shahid',
                                yearIn: 2011,
                                yearOut: 2012
                            },
                            {
                                company: 'Muslim Internatinal Inc',
                                position: 'Senior Shahid',
                                yearIn: 2012,
                                yearOut: 2013
                            }
                        ],
                        skills: [
                            {id: 0, skill_name: 'Accurate', average_rank: 86, vote_value: 3},
                            {id: 1, skill_name: 'Adoptable', average_rank: 72, vote_value: 4},
                            {id: 2, skill_name: 'Ambitious', average_rank: 90, vote_value: 5},
                            {id: 3, skill_name: 'Accurate', average_rank: 86, vote_value: 6},
                            {id: 4, skill_name: 'Adoptable', average_rank: 72, vote_value: 7},
                            {id: 5, skill_name: 'Ambitious', average_rank: 90, vote_value: 8}
                        ]
                    },
                    newJobId = {id: 100},
                    addJobResponseData = {requestId: 123415},
                    addSkillResponseData = {requestId: 23445},
                    deleteProfileResponseData = {requestId: 23445},
                    searchResult = [{
                        id: 1, 
                        first_name: 'Abdula', 
                        last_name: 'Ivanov'
                    }, {
                        id: 1,
                        first_name: 'Rashid', 
                        last_name: 'Ivanov'
                    }, {
                        id: 1,
                        first_name: 'Ahmed', 
                        last_name: 'Ivanov'
                    }],

                    generalVoteData = {
                        status: 0,
                        general_average_rank: 91,
                        general_vote: 3
                    },

                    skillVoteData = {
                        status: 0,
                        skill_average_rank: 63,
                        vote_value: 8
                    },

                    skills = [
                        {id: 1, skill_name: 'Accurate'},
                        {id: 2, skill_name: 'Adoptable'},
                        {id: 3, skill_name: 'Ambitious'},
                        {id: 4, skill_name: 'Skill1'},
                        {id: 5, skill_name: 'Skill2'},
                        {id: 6, skill_name: 'NewSkill1'},
                        {id: 7, skill_name: 'NewSkill2'},
                        {id: 8, skill_name: 'NoSkills'}
                    ],
                    popularProfiles = [
                        {id: 1, first_name: 'Abdula', last_name: 'Ivanov',theme_name: "1"},
                        {id: 1, first_name: 'Rashid', last_name: 'Ivanov',theme_name: "2"},
                        {id: 1, first_name: 'Ahmed', last_name: 'Ivanov',theme_name: "3"},
                        {id: 1, first_name: 'Abdula', last_name: 'Ivanov',theme_name: "4"},
                        {id: 1, first_name: 'Rashid', last_name: 'Ivanov',theme_name: "5"},
                        {id: 1, first_name: 'Ahmed', last_name: 'Ivanov',theme_name: "6"},
                        {id: 1, first_name: 'Abdula', last_name: 'Ivanov',theme_name: "7"},
                        {id: 1, first_name: 'Rashid', last_name: 'Ivanov',theme_name: "8"},
                        {id: 1, first_name: 'Ahmed', last_name: 'Ivanov',theme_name: "9"},
                        {id: 1, first_name: 'Abdula', last_name: 'Ivanov',theme_name: "10"}
                    ];


              

                $httpBackend.whenGET(/\.html$/).passThrough();
            
            

                $httpBackend.when('POST', utils.apiUrl('/login'))
                    .respond(function () {
                        return [200, {status: 0, data: loginResponse}, {}];
                    });

               $httpBackend.when('GET', utils.apiUrl('/logout'))
                    .respond(function () {
                        return [200, {status: 0, data: {}}, {}];
                    });

         

                $httpBackend.when('POST', utils.apiUrl('/bookmark/profile/1'))
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

                $httpBackend.when('DELETE', new RegExp(utils.apiUrl('/bookmark/profile/') + '\\d+'))
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

                $httpBackend.when('GET', utils.apiUrl('/bookmark'))
                    .respond(function () {
                        return [200, {status: 0, data: bookmarksResponse}, {}];
                    });

               

                $httpBackend.when('GET', /\/comment/)
                    .respond(function () {
                        return [200, {status: 0, data: reviews}, {}];
                    });

                $httpBackend.when('POST', /\/comment/)
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

             

                $httpBackend.when('POST', utils.apiUrl('/feedback'))
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

               


                $httpBackend.when('GET', new RegExp(utils.apiUrl('/news/') + '\\w+'))
                    .respond(function () {
                        return [200, {status: 0, data: latestNews}, {}];
                    });

              

                $httpBackend.when('GET', /\/profile\/1?/)
                    .respond(function () {
                        return [200, {status: 0, data: profileInfo}, {}];
                    });

                $httpBackend.when('GET', /\/profile\/2?/)
                    .respond(function () {
                        return [200, {status: 0, data: newProfileInfo}, {}];
                    });

                $httpBackend.when('POST', utils.apiUrl('/profile'))
                    .respond(function () {
                        return [200, {status: 0, data: newProfile}, {}];
                    });

                $httpBackend.when('POST', utils.apiUrl('/profile/1/job'))
                    .respond(function () {
                        return [200, {status: 0, data: newJobId}, {}];
                    });


                $httpBackend.when('POST', utils.apiUrl('/profile/2/job'))
                    .respond(function () {
                        return [200, {status: 0, data: newJobId}, {}];
                    });

                $httpBackend.when('POST', utils.apiUrl('/profile/1/skill'))
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

                $httpBackend.when('DELETE', utils.apiUrl('/profile/1'))
                    .respond(function () {
                        return [200, {status: 0}, {}];
                    });

              

                $httpBackend.when('POST', /\/rest\/profile\/\w+\/job/)
                    .respond(function () {
                        return [200, {status: 0, data: addJobResponseData}, {}];
                    });

                $httpBackend.when('POST', /\/rest\/profile\/\w+\/skill/)
                    .respond(function () {
                        return [200, {status: 0, data: addSkillResponseData}, {}];
                    });

                $httpBackend.when('POST', utils.apiUrl('/request/delete_profile/1'))
                    .respond(function () {
                        return [200, {status: 0, data: deleteProfileResponseData}, {}];
                    });

            

                $httpBackend.when('GET', /\/search?/)
                    .respond(function () {
                        return [200, {status: 0, data: searchResult}, {}];
                    });

                $httpBackend.when('GET', utils.apiUrl('/error/1'))
                    .respond(function () {
                        return [500, {status: 0, data: 'error 500'}, {}];
                    });

                $httpBackend.when('GET', utils.apiUrl('/error/2'))
                    .respond(function () {
                        return [200, {status: 500, data: 'error 500'}, {}];
                    });

                $httpBackend.when('GET', utils.apiUrl('/error/3'))
                    .respond(function () {
                        return [200, {status: 401, data: 'error 401'}, {}];
                    });

              

                 $httpBackend.when('POST', /\/terms_signed/)
                    .respond(function () {
                        return [200, {status: 0, data: {status: 0}}];
                    });

            

                $httpBackend.when('POST', utils.apiUrl('/vote/1'))
                    .respond(function () {
                        return [ 200, {status: 0, data: generalVoteData }];
                    });

                $httpBackend.when('POST', new RegExp(utils.apiUrl('/vote/1/') + '\\d+'))
                    .respond(function () {
                        return [200, {status: 0, data: angular.copy(skillVoteData)}];
                    });

            
                $httpBackend.when('GET', /rest\/skills\?\w+/).respond(function () {
                    return [200, {status: 0, data: skills}, {}];
                });

            

                $httpBackend.when('GET', /\/popular/).respond(function () {
                    return [200, {status: 0, data: popularProfiles}, {}];
                });
              

                
            }//end of init mocks
        };//end of return 
    });//end of module
    
*/