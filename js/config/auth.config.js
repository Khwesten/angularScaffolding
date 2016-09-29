App.run(function ($rootScope, $http, $templateCache, endPoint) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var session = $.jStorage.get('session');

        if (next.$$route) {
            if (
                /* pages no need auth */
                next.$$route.originalPath != '/register'
                && next.$$route.originalPath != '/new-password'
                && next.$$route.originalPath != '/forgot-password'
            ) {
                next.$$route.originalPath ? path = next.$$route.originalPath.substring(1) : null;
                !session ? window.location.href = '/' : null;
                $.jStorage.set('path', path)
            }
        }
    });

    function getSubdomain() {
        var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
        var urlParts = regexParse.exec(window.location.hostname);
        return window.location.hostname.replace(urlParts[0], '').slice(0, -1);
    };
});
