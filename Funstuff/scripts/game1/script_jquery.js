﻿$(document).ready(function () {

    //create object from constructor function
    gameCube = new Component(30, 30, "green", 10, 120);
    obstacle = new Component(10, 200, "red", 300, 120);
    gameArea.start(gameCube);

    $(document).keydown(function (myEvent) {
        switch (myEvent.which) {
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



});