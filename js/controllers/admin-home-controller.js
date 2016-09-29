(function () {
    'use strict';
    App.controller('AdminHomeCtrl', function ($scope, utils) {

        $scope.logout = function () {
            utils.logout();
            utils.alert({msg : 'Você foi deslogado com sucesso!', type : 'success'});
        };
        
    });
})();
