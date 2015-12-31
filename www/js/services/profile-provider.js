'use strict';

angular.module('reviyouMobileApp')
    .factory('profileProvider',["$q","defaultProvider", function ($q,defaultProvider) {
        var urlRoot = '/profile',
            defaultProfileData = {
                name: '',
                email: '',
                can_delete: false,
                //position: '',
               
                jobs: 
                	[{
                		occupation:'',
                		companies: [{
                					name: '',
                					start_date: '',
									end_date:'',
                				}],
                		start_date: '',
                		end_date:'',
                	}]
                ,
                theme_name: "" +(Math.floor(Math.random()*10)+1)
            },  
            createProfileData = angular.copy(defaultProfileData),
            
            
            profileData = {},
            isGeneral,
            activeSkillId;

            function getProfile (id) {
            	var dfd = $q.defer();
            	var callback = function(res) {resetProfileData(res);dfd.resolve(res);};
            	defaultProvider.fetch(urlRoot, {
                    id: id,
                    success: callback
                });
               return dfd.promise
            }



            function createProfile (profileData, callbackSuccess, callbackError) {
                defaultProvider.create(urlRoot, {
                    body: profileData,
                    success: callbackSuccess,
                    error: callbackError //return the same callback no matter what
                });
            }

            function deleteProfile (id, callback) {
                defaultProvider.remove(urlRoot, {
                    id: id,
                    success: callback
                });
            }

            function addJob (id, job, callback) {
                defaultProvider.create(urlRoot + '/' + id + '/job', {
                    body: job,
                    success: function (data) {
                        pushJob(job);
                        callback(data);
                    }
                });
            }

            function addProfileSkill (profile_id, skill_id, success, error) {
                if (!skill_id || !profile_id || !skill_id.toString){
                    throw 'wrong parameters';
                }

                defaultProvider.create(urlRoot + '/' + profile_id + '/skill', {
                    body: {
                        skill_id: skill_id.toString()
                    },
                    success: success,
                    error: error
                });
            }

            function getCreateProfileData () {
                return createProfileData;
            }
            function resetCreateProfileData() {
	            createProfileData = angular.copy(defaultProfileData);
            }



            function pushJob (job) {
                profileData.jobs.push(job);
            }


            function unshiftJob (job) {
                profileData.jobs.unshift(job);
            }

			            
            //TODO: rename to SETData
            function resetProfileData(data) {
           		//clean previous data:
           		profileData = {};
                angular.forEach(data, function (value, key) {
                    this[key] = value;
                }, profileData);
          
                return this;
               
            }


            function getProfileData () {
        		
                return profileData;
            }

            function getProfileProp (key) {
                return profileData[key];
            }

            function getActiveSkillId () {
                return activeSkillId;
            }

            function getActiveSkill () {
                 var result = null;
                    angular.forEach(profileData.skills, function (skill) {
	                    if (!result && skill.id === activeSkillId) {
	                        result = skill
	                        //todo break;
	                    }
	                });

                return result;
            }

            function setActiveSkillId (id) {
                activeSkillId = id;
            }
            
            function getIsGeneral () {
                return isGeneral;
            }

            function setIsGeneral (isGen) {
                isGeneral = isGen;
            }

        return {
            getCreateProfileData: getCreateProfileData,
            resetCreateProfileData: resetCreateProfileData,
            //getSkillById: getSkillById,
            getProfile: getProfile,
            createProfile: createProfile,
            deleteProfile: deleteProfile,
            addJob: addJob,
            addProfileSkill: addProfileSkill,
            resetProfileData: resetProfileData,
            getProfileData: getProfileData,
            getProfileProp: getProfileProp,
            getActiveSkillId: getActiveSkillId,
            getActiveSkill: getActiveSkill,
            setActiveSkillId: setActiveSkillId,
            getIsGeneral:getIsGeneral,
            setIsGeneral:setIsGeneral
            
        };
    }]);
