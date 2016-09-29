(function () {
    'use strict';
    App.controller('HomeCtrl', function ($scope, utils, storage) {

        $scope.logout = function () {
            utils.logout();
            utils.alert({msg: 'Você foi deslogado com sucesso!', type: 'success'});
        };

    });
})();
