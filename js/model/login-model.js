(function() {
  'use strict';
  App.factory('Login', function ($http, $timeout, endPoint) {

    return new function(){
    	this.auth = function(data){
    		return $http(
          {
            method: 'POST',
            url: endPoint.url.stage + 'oauth2/token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
              transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
              data: data
          }).then(function(response){
                return response.data;
            });
    	};

        this.logout = function(data){
          return $http(
              {
                  method: 'POST',
                  url: endPoint.url.stage + 'oauth2/token/revoke',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  transformRequest: function(obj) {
                      var str = [];
                      for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                      return str.join("&");
                  },
                  data: data
              }).then(function(response){
                return response.data;
              });
        };

        this.save = function(data){
            return $.jStorage.set('session', data);
        };

        this.logout = function(){
            $.jStorage.flush();
            window.location = "#";
        };

        this.recoverPassword = function(data) {
          return $http.post(endPoint.url.stage + 'user/recoverPassword', {email : data})
            .then(function(response) {
              return response.data;
            });
        };

        this.newPassword = function(data) {
          return $http.put(endPoint.url.stage + 'user/password/' + data.token, data.password)
            .then(function(response) {
              return response.data;
            });
        };
    };

  });
})();
