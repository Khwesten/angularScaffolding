(function () {
    'use strict';
    App.controller('LoginCtrl', function ($scope, Login, $window, $timeout, storage, User, utils) {
        $scope.date = new Date();
        $scope.invalid = false;
        $scope.login = {
            username: "",
            password: "",
            grant_type: "token",
            client_id: "A99uGao4M831VT8j3poM7AeRDODT0YUj"
        };

        $scope.doLogin = function () {
            Login
                .auth($scope.login)
                .then(function (response) {

                    var user = response.user;
                    var data = {
                        token: response.access_token_id,
                        school: response.school,
                        user: user
                    };
                    Login.save(data);
                    storage.path('home');
                    user.role == 'ADMIN' ? $window.location.href = '/#question' : $window.location.href = '/#home';
                    utils.alert({msg: 'Logado com sucesso!', type: 'success', timeout: 3000});
                }, function (err) {
                    $scope.invalid = true;
                });
        }
    });
})();
