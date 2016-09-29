(function () {
    'use strict';
    App.factory('storage', function ($window, $http) {

        var _authorization = function () {
            var session = $.jStorage.get('session');
            if (session)
                return $http.defaults.headers.common['Authorization'] = session.token;
        };

        var _user = new function () {
            this.get = function () {
                var session = $.jStorage.get('session');
                if (session)
                    return session.user;
            };
            this.set = function (data) {
                return $.jStorage.set('session', data);
            };
        };

        var _path = function (path) {
            return $.jStorage.set('path', path);
        };

        return {
            authorization: _authorization,
            user: _user,
            path: _path
        };

    });
})();
