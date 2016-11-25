var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.cubeSpeedOptions = [
            { value: 1, name: 'Slow' },
            { value: 5, name: 'Medium' },
            { value: 10, name: 'Fast' },
    ];

    $scope.cubeSpeedChange = function () {
        gameCube.speed = $scope.selectedCubeSpeed['value'];
    }

});