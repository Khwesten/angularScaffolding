(function () {
    'use strict';
    angular.module('App')
        .directive('bodyDirective', function () {

            return {
                restrict: 'E',
                templateUrl: function (elem, attr) {
                    var session = $.jStorage.get('session')
                    var role = session.user.role.toLowerCase();
                    var path = $.jStorage.get('path');
                    return 'templates/' + role + '/' + role + '-' + path + '.html'
                }
            }
        });
})();