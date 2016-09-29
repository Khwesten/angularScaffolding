(function () {
    'use strict';
    App.controller('FiscalProfileCtrl', function ($scope, $uibModal, storage, User, utils) {

        $scope.pass = {};

        User
            .getUser()
            .then(function (res) {
                $scope.user = res;
            });

        $scope.updateUser = function () {
            var user = {
                name: $scope.user.name,
                email: $scope.user.email,
                phone: $scope.user.phone
            };

            User
                .update(user)
                .then(function (res) {
                    utils.alert({msg: 'Usuário atualizado com sucesso!', type: 'success'});
                }).catch(function (err) {
                utils.httpExc(err);
            });
        };

        $scope.openChangePass = function () {
            $uibModal.open({
                animation: true,
                templateUrl: './templates/includes/alerts/change-password.html',
                scope: $scope,
                size: 'sm'
            });
        };

        $scope.logout = function () {
            utils.alert({msg: 'Você foi deslogado com sucesso!', type: 'success'});
            utils.logout();
        };

        $scope.changePass = function () {
            User
                .changePassword($scope.pass)
                .then(function (res) {
                    utils.alert({msg: 'Senha alterado com sucesso!', type: 'success'});
                }).catch(function (err) {
                utils.httpExc(err);
            });
        };

    });
})();
