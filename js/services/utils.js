(function () {
    'use strict';
    App.factory('utils', function ($window, $http, $rootScope, endPoint, storage) {

        var _authorization = function () {
            var session = $.jStorage.get('session');
            if (session)
                return $http.defaults.headers.common['AUTH-TOKEN'] = session.token;
        };

        var _alert = function (alert) {
            return $rootScope.$broadcast('alert', alert)
        };

        var _logout = function () {
            var session = $.jStorage.get('session');
            if (session) {
                var token = session.token;
                var data = {
                    token: token
                };

                $http(
                    {
                        method: 'POST',
                        url: endPoint.url.stage + 'oauth2/token/revoke',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: data
                    }).then(function (response) {
                    $.jStorage.flush();
                    $window.location.href = '/#';
                });
            }
        };

        var _erroHandler = function (err) {
            switch (err.status) {
                case 401:
                    $window.location.href = '/#';
                    _alert({msg: 'Sua sessão exipirou, faça login novamente!', type: 'danger', timeout: 5000});
                    break;
                case 404:
                    _alert({msg: 'Não encontrado, verifique e tente novamente!', type: 'danger', timeout: 3000});
                    break;
                default:
                    _alert({msg: 'Ocorreu um erro inesperado, tente novamente!', type: 'danger', timeout: 3000});
                    break;
            }

        };

        var _is = new function () {
            this.int = function (n) {
                return n % 1 === 0;
            };
            this.valid = function (who) {
                return !(who === undefined || who === null || who == [] || who == {} || who === '' || who === ' ');
            };
            this.invalid = function (who) {
                return (who === undefined || who === null || who == [] || who == {} || who === '' || who === ' ');
            };
            this.connect = function () {
                return $.jStorage.set('connect', true);
            };
            this.disconnect = function () {
                return $.jStorage.set('connect', false);
            };
            this.logged = function () {
                return $.jStorage.get('session');
            }
        };

        return {
            authorization: _authorization,
            alert: _alert,
            httpExc: _erroHandler,
            logout: _logout,
            is: _is
        };

    });
})();
