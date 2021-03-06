﻿app.expandController2 = function ($scope) {


    $scope.clearandpaint = function () {

        $scope.clearGrid();

        $scope.countRows = canvas_width / cell_width;
        $scope.countColumns = grid_height / cell_width;

        $scope.drawGrid();
     
    }


    //paint function that is called on interval
    $scope.paint = function () {

      



        //if in pause mode , dont update anything
        if (pause == true) {
            return;
        }

        //need to clear screen every frame, so have to redraw grid evry frame.also sets count of Rows and Columns
        $scope.clearandpaint();

        //x and y of next move
        //snake_array[0] is the head, first to be drawn
        //it will be next i when incremented , not initiliased
        var nextx = snake_array[0].x;
        var nexty = snake_array[0].y;

        //preserve a copy, before incremneting real x and y.
        //this is the actual location on snake head in grid
        var presentx = nextx + 1 ;
        var presenty = nexty + 1

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


        //check hitting the wall or itself
        if (nextx == -1 || nextx == $scope.countRows || nexty == -1 || nexty == $scope.countColumns || check_collision(nextx, nexty, snake_array)) {

         

            //alert(nextx,nexty,"going to restart");
            $scope.restart();
            return;
        }

      

      


        //food also has to be refreshed
        paint_cell(food.x, food.y,'green');

        //paint score. angular function . so that in it can access angular score variable
        $scope.paintscore();


        //if snake hits food
        if (nextx == food.x && nexty == food.y) {
            //snake grows
            //name tail is used just so that it uses the same variable in else part. should be named head
            var tail = { x: food.x, y: food.y }

            //incrase score by 100
            $scope.score = $scope.score + 100;

            //everytime score increase set threshold check to false;
            //makes it easy
            //when score increases to next level, catch it set it to true some other place;
            $scope.thresholdwatch = false;

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

      
        //draw snake before
        drawsnake();


    

        //check score threshold

        // when score is a threshold, eg 300 , and snake is moving towards next target , timer is restarted for every frame
        // threshold check prevents that.
        //new refresh rates only when thresholdwatch is true
        if ($scope.score == level2score || $scope.score == level3score) {


            //$scope.thresholdwatch is set to false in ang_init and everytime when score increases. set it to true when moving to next level

            if ($scope.thresholdwatch == false) {
                $scope.thresholdwatch = true;

                $scope.nextLevel();
            }
            
        }
       
    }

 


}