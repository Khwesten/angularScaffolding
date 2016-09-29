App.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        });
});
