(function() {
  'use strict';
  App.factory('User', function ($http, $timeout, endPoint, storage) {

    return new function(){
    	this.registerUser = function(data){
    		return $http.post(endPoint.url.stage + 'user', data)
                .then(function(response){
                    return response.data;
                });
    	};

        this.update = function(data) {
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user', data)
                .then(function(response) {
                    return response.data;
                });
        };

        this.changePassword = function(data) {
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user/password', data)
                .then(function(response) {
                    return response.data;
                });
        };

        this.associateStudentInSchool = function(idUser, idSchool, data){
            return $http.put(endPoint.url.stage + 'user/associateStudent/' + idUser + "/" + idSchool, data)
                .then(function(response){
                    return response.data;
                });
        };

        this.associateSchoolAdmInSchool = function(idUser, idSchool, data){
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user/associateAdminInSchool/' + idUser + "/" + idSchool, data)
                .then(function(response){
                    return response.data;
                });
        };

        this.associateInterviewInSchool = function(idUser, idSchool, data){
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user/associateInterviewerInSchool/' + idUser + "/" + idSchool, data)
                .then(function(response){
                    return response.data;
                });
        };

        this.associateFiscalInSchool = function(idUser, idSchool, data){
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user/associateFiscalInSchool/' + idUser + "/" + idSchool, data)
                .then(function(response){
                    return response.data;
                });
        };

        this.getStudentEnrollmentInSchool = function(idSchool){
            new storage.authorization();
            return $http.get(endPoint.url.stage + 'school/enrollmentSchool/' + idSchool)
                .then(function(response){
                    return response.data;
                });
        };

        this.getStudentEnrollment = function(idEnroll){
            new storage.authorization();
            return $http.get(endPoint.url.stage + 'school/enrollment/' + idEnroll)
                .then(function(response){
                    return response.data;
                });
        };

        this.getUser = function(){
            new storage.authorization();
            return $http.get(endPoint.url.stage + 'user')
                .then(function(response){
                    return response.data;
                });
        };

        this.deleteTargetUser = function(idUser){
            new storage.authorization();
            return $http.delete(endPoint.url.stage + 'user/target/' + idUser)
                .then(function(response){
                    return response;
                });
        };

        this.makeNewPassword = function (userId) {
            new storage.authorization();
            return $http.put(endPoint.url.stage + 'user/makeNewPassword/' + userId)
                .then(function(response){
                    return response.data;
                });
        }

    };

  });
})();
