(function () {
    'use strict';
    angular.module('App')
        .directive('footerDirective', function () {

            return {
                restrict: 'E',
                templateUrl: 'templates/includes/footer-template.html'
            }
        });
})();