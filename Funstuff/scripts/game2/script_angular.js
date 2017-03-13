var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $interval) {

    //js init cant access $scope objects. so anguler init
    $scope.init = function () {
        $scope.score = 0;
    }

    //seems angular controller executes before jquery ready
    //call the javascript initialise function
    init();
    //call anugkar init
    $scope.init();

    //Initiate the timer object.
    $scope.Timer = null;

    $scope.level = 1;



    $scope.score = 0;


    //should be declared before calling. javascript style
    $scope.paintscore = function () {
        var score_text = "Score: " + $scope.score;
        //passed with x and y co-ordinate to start painting
        ctx.fillText(score_text, 5, canvas_height - 5);
    }

    //paint function
    $scope.paint = function () {



        //if in pause mode , dont update anything
        if (pause == true) {
            return;
        }


        ctx.fillStyle = "white";

        ctx.fillRect(0, 0, canvas_width, canvas_height);

        ctx.strokeStyle = "black";

        //stroke - the  border around rectangle . hit for snake
        ctx.strokeRect(0, 0, canvas_width, canvas_height);


        //x and y of next move
        //snake_array[0] is the head, first to be drawn
        var nextx = snake_array[0].x;
        var nexty = snake_array[0].y;

        //pushes the first cell start point by one based on snake_direction
        //changes eithr x or y
        if (snake_direction == "right") {
            //moving left. add startx by 1;
            nextx++;
        }
        else if (snake_direction == "left") {
            //moving left. reduce startx by 1;
            nextx--;
        }
        else if (snake_direction == "up") {
            nexty--;
        }
        else if (snake_direction == "down") {
            nexty++;
        }

        //paint snake. head is drawn first. tail is last
        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];

            paint_cell(c.x, c.y);
        }


        //food also has to be refreshed
        paint_cell(food.x, food.y);

        //paint score. angular function . so that in it can access angular score variable
        $scope.paintscore();


        //if snake hits food
        if (nextx == food.x && nexty == food.y) {
            //snake grows
            //name tail is used just so that it uses the same variable in else part. should be named head
            var tail = { x: food.x, y: food.y }

            //incrase score by 100
            $scope.score = $scope.score + 100;

            //create new food if snake hits the food
            create_food()
        }
        else {
            //move where sname does not grow
            //pops out the last array cell of snake ,drawn last. since snake moves. 
            var tail = snake_array.pop();

            //reuses the tail object and sets its x and y (the next head, tail becomes the next head) . sets it to the next cell whre snake should be moving
            tail.x = nextx;
            tail.y = nexty;
        }


        //unshift is a js function. instead of push it puts elemnets to 0 location. first cell to be drawn
        //when food is consumed tail is food location. makes it first cell to be drawn. in this case it should have been called head since this is the first cell to be snake array and first to be drawn
        snake_array.unshift(tail);


        //check hitting the wall or itself
        if (nextx == -1 || nextx == canvas_width / cell_width || nexty == -1 || nexty == canvas_height / cell_width || check_collision(nextx, nexty, snake_array)) {

            //restart game
            init();
            $scope.init();
            return;
        }

        //check score threshold
        if ($scope.score == 300 || $scope.score == 600) {
            //stop numbers
            $scope.StopTimer();

            //restart timer with new numbers
            $scope.StartTimer();

        }
    }

    //timer start function
    $scope.StartTimer = function () {
        

        //get therequired  refresh rate from the score
        refreshrate = levels[$scope.score];
        cell_width = widths[$scope.score];


        //just the name of the function in interval, no ()
        $scope.Timer = $interval($scope.paint, refreshrate);
     
    }




    $scope.StartTimer();



    $scope.StopTimer = function () {
        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
    }



});