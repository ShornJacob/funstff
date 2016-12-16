﻿$(document).ready(function () {

    //create object from constructor function
    gameCube = new Component(30, 30, "../Images/plane.png", 10, 120, "image");
    myScore = new Component("30px", "Consolas", "black", 280, 40, "text");

    gameArea.start(gameCube);

    $(document).keydown(function (myEvent) {
        switch (myEvent.which) {

            case 32: //left
                pauseGame();
                break;

            
            //case 37: //left
            //    moveLeft();
            //    break;

            case 38: //up
                moveUp();
                break;

            case 39: //right
                moveRight();
                break;


            case 40: //down
                moveDown();
                break;

            default: return; //exit this handler for other keys
        }
        myEvent.preventDefault(); // prevent the default action 

    });


    $(document).keyup(function (myEvent) {
        //when up or down key is done , plane image should be made straight
        if(myEvent.which == 38 || myEvent.which == 40) {
            clearMove();
        }
        myEvent.preventDefault(); // prevent the default action 

    });

  
    //touchSwipe - enable swipe 

    //$("#container").swipe({

    //    swipe: function (event, direction, distance, duration, fingerCount) {
    //        switch (direction) {

    //            //distance paramteter moves the plane far too much. some othe unit suspected. divide by 10 

    //            case 'left': //left
    //                angular.element($('#container')).scope().displaySwipeDist(distance)
    //                angular.element($('#container')).scope().$apply();
    //                break;


    //            case 'right': //right
    //                angular.element($('#container')).scope().displaySwipeDist(distance)
    //                angular.element($('#container')).scope().$apply();
    //                break;


    //                //reset to straight picture using clearMove
    //            case 'up': //up
                


    //                break;

    //            case 'down': //down
    //                angular.element($('#container')).scope().displaySwipeDist(distance)
    //                angular.element($('#container')).scope().$apply();
    //                if (distance < 100) {
    //                    moveDown();
    //                    movedown
    //                }
                  
    //                break;


         



    //            default: return; //exit this handler for other keys
    //        }
    //    }
    //})


});



