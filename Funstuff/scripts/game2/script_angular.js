

app.controller('myCtrl', function ($scope, $interval) {

    //functions to be used by the controller that needs access to scope are defined in another file
    //a way to attch functions to scope in a seperate file
    app.expandController($scope, $interval);

    app.expandController2($scope);


    //calling inits. js and angularjs
    //seems angular controller executes before jquery ready
    //call the javascript initialise function


    jsinit();

    $scope.ang_init();

    $scope.StartTimer();

});