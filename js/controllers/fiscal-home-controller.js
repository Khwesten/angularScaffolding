App.controller('FiscalHomeCtrl', function ($scope, School, storage, utils, $interval) {

    $scope.school = storage.school.get();
    $scope.user = storage.user.get();


    var stop = $interval(function () {
        School
            .getAllEnrollment($scope.school.id)
            .then(function (res) {
                $scope.exams = res;
            });
    }, 2000);

    $scope.stopWatchFiscal = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        $scope.stopWatchFiscal();
    });

    $scope.logout = function () {
        utils.logout();
        utils.alert({msg: 'Você foi deslogado com sucesso!', type: 'success'});
    };

    $scope.allowOrBlockEvaluation = function (enroll) {

        var allow = enroll.authorizedToTakeTheTest;
        var idUser = enroll.student.id;
        if (allow) {
            School
                .blockStudentForEvaluation(enroll.id)
                .then(function (response) {
                    var se = response;
                    var i;
                    for (i = 0; i < $scope.exams.length; i++) {
                        if ($scope.exams[i].id == se.id) {
                            $scope.exams[i].authorizedToTakeTheTest = false;
                            return "BLOQUEADO PARA PROVA";
                        }
                    }
                });
        } else {
            School
                .allowStudentForEvaluation(enroll.id)
                .then(function (response) {
                    var se = response;
                    var i;
                    for (i = 0; i < $scope.exams.length; i++) {
                        if ($scope.exams[i].id == se.id) {
                            $scope.exams[i].authorizedToTakeTheTest = true;
                            return "LIBERADO PARA PROVA";
                        }
                    }
                });
        }
    }

    $scope.releaseAll = function () {
        School
            .allowAllStudentForEvaluation($scope.school.id)
            .then(function (response) {
                $scope.exams = response;
            });
    }
});