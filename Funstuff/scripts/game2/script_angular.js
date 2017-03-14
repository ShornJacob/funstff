

app.controller('myCtrl', function ($scope, $interval) {

    //functions to be used by the controller that needs access to scope are defined in another file
    app.expandController($scope,$interval);


    //calling inits. js and angularjs
    //seems angular controller executes before jquery ready
    //call the javascript initialise function

    $scope.ang_init();

    $scope.StartTimer();

});