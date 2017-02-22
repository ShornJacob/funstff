$(document).ready(function () {

    //Canvas stuff
    
    //get the dom object from the jquery object
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");

    //access the properties of element from jquery object
    canvas_width = $("#canvas").width();
    canvas_height = $("#canvas").height();

    init();

    $(document).keydown(function (e) {
        var key = e.which;

        //this flicks pause status
        if (key == "32") pauseGame();

        //direction keys are  valid when game is not paused
        if (pause == false) {
            if (key == "37" && direction != "right") direction = "left";
            else if (key == "38" && direction != "down") direction = "up";
            else if (key == "39" && direction != "left") direction = "right";
            else if (key == "40" && direction != "up") direction = "down";
        }
       
    })


    //touchSwipe - enable swipe 

    $("#container").swipe({

        swipe: function (event, direction, distance, duration, fingerCount) {
            switch (direction) {

                //distance paramteter moves the plane far too much. some othe unit suspected. divide by 10 

                case 'left': //left
                    if (direction != "right") direction = "left";
                    break;


                case 'right': //right
                    if (direction != "left") direction = "right";
                    break;


                    //reset to straight picture using clearMove
                case 'up': //up
                    if (direction != "up") direction = "down";
                    break;

                case 'down': //down
                  
                    break;






                default: return; //exit this handler for other keys
            }
        }
    })


})