(function () {
    'use strict';
    App.controller('app', function ($scope, $rootScope, $timeout, $http) {

		$scope.alerts = [];

		$http.get('build.version')
			.then(function(response){
			$scope.version = response.data.version;
		}).catch(function(err){

		});

		$timeout(function () {
			$('.load-page').fadeOut();
		},1000);

		$rootScope.$on('alert', function (evt, data) {
			$scope.alerts.push(data);
			timeOut(data.timeout);
		});

		function timeOut(time) {
			$timeout(function() {
				return $scope.alerts.splice(0, 1);
			}, time ? time : 3000);
		};

    });
})();
