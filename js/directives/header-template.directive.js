(function () {
    'use strict';
    angular.module('App')
        .directive('headerDirective', function () {

            return {
                restrict: 'E',
                templateUrl: function (elem, attr) {
                    var session = $.jStorage.get('session')
                    var role = session.user.role.toLowerCase();
                    return 'templates/includes/header-' + role + '-template.html'
                }
            }
        });
})();