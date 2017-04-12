var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

    // Check for the various File API support.
    if (window.File) {
        $scope.Filesupport = "File API supported in  browser."
    } else {
        $scope.Filesupport = "File API not fully supported in  browser."
    }

    //this executes after page load completes
    js_init();

})