$(document).ready(function () {

    //create object from constructor function
    gameCube = new Component(30, 30, "../Images/plane.png", 10, 120, "image");
    myScore = new Component("30px", "Consolas", "black", 280, 40, "text");

    gameArea.start(gameCube);

    $(document).keydown(function (myEvent) {
        switch (myEvent.which) {

            case 32: //left
                pauseGame();
                break;

            
            case 37: //left
                moveLeft();
                break;

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

  

    //touchSwipe

    $("#container").swipe({
       
        swipe : function (event, direction, distance, duration, fingerCount) {
            switch (direction) {

                //distance paramteter moves the plane far too much. some othe unit suspected. divide by 10 

                case 'left': //left
                    if (distance < 80) {
                        moveLeft();
                    }
                    else {
                        for (i = 0; i < distance / 10 ; i++) {
                            setTimeout(moveLeft, 300);
                        }
                    }
                     
                    
                    break;


                case 'right': //right
                    if (distance < 80) {
                        moveRight();
                    }
                    else {
                        for (i = 0; i < distance / 10 ; i++) {
                            setTimeout(moveRight, 300);
                        }
                    }
                    break;


                    //reset to straight picture using clearMove
                case 'up': //up
                    if (distance < 80) {
                        moveUp();
                        clearMove();
                    }
                    else {
                        for (i = 0; i < distance / 10 ; i++) {
                            setTimeout(moveUp, 300);
                        }
                        setTimeout(clearMove, 500);
                    }
                   
                   
                    break;

                case 'down': //down
                    if (distance < 80) {
                        moveDown();
                        clearMove();
                    }
                    else {
                        for (i = 0; i < distance / 10 ; i++) {
                            setTimeout(moveDown, 300);
                        }
                        setTimeout(clearMove, 500);
                    }
                   
                  
                    break;



                default: return; //exit this handler for other keys
            }
        }
    })


});