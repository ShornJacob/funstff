var app = angular.module('myApp', []);

//functions to be used by the controller that needs access to scope are defined here

app.expandController = function ($scope, $interval, $timeout) {

   

    //js init cant access $scope objects. so anguler init
    $scope.ang_init = function () {

        //score variable is required for finding celll width 
        //get from global js variable which stores score
        $scope.score = score;


        $scope.Timer = null;

        $scope.thresholdwatch = false;

    }

    //should be declared before calling. javascript style
    $scope.paintscore = function () {
        var score_text = "Score: " + $scope.score;
        //passed with x and y co-ordinate to start painting
        ctx.fillText(score_text, 5, canvas_height - 5);
    }


    //is called first and everytime when level changes
    $scope.StartTimer = function () {

        //draw grid before timer starts ticking
        $scope.paintGrid();

        //get therequired  refresh rate from the score
        refreshrate = levels[$scope.score];
        cell_width = widths[$scope.score];


        //just the name of the function in interval, no ()
        $scope.Timer = $interval($scope.paint, refreshrate);

    }


    //is called first and everytime when level changes
    $scope.StopTimer = function () {
        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
    }

    $scope.restart = function () {



        //stop numbers
        $scope.StopTimer();

        sleep(2000);

        //positions snake in begining and sets score to zero
        jsinit();

        //set scope score variable to zero
        $scope.ang_init();


        $scope.StartTimer()

     
    }

    $scope.nextLevel = function () {


        //stop numbers
        $scope.StopTimer();

        sleep(1000);

        $scope.StartTimer();

    }


}