var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

    // Check for the various File API support.
    if (window.File) {
        $scope.Filesupport = "File API supported in  browser."
    } else {
        $scope.Filesupport = "File API not fully supported in  browser."
    }


    $scope.loadComplete = function () {
        $scope.filestatus = "File Loaded"
    }

    $scope.loadError = function () {
        $scope.filestatus = "File Not Loaded"
    }

    $scope.processFile = function() {
        var xmlFile = document.getElementById("xmlFile");

        //case matters
        var xmlhttp = new XMLHttpRequest();

        //XML HTtp Request (XHR)
        //xhrReq.open(method, url, async);
        //An optional Boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously. 
        //If this value is false, the send()method does not return until the response is received.
        //Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.
        xmlhttp.open("GET", xmlFile, true);


        //XMLHttpRequest provides the ability to listen to various events that can occur while the request is being processed. 
        xmlhttp.addEventListener("load", $scope.loadComplete);
        xmlhttp.addEventListener("error", $scope.loadError);


    }

    //this executes after page load completes
    js_init();

})