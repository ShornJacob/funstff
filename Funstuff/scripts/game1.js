﻿"use strict";



var gameCube;
var obstacle

$(document).ready(function () {

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



//object initializer. Literal notation . This creates an object myGameArea with properties
var gameArea = {


    start: function (gameCube) {
        this.canvasWidth = $("#canvas1").attr("width");
        this.canvasHeight = $("#canvas1").attr("height");
        this.context = $("#canvas1")[0].getContext("2d");
        //this.gameCube = gameCube
        this.refreshCanvas();
    },

    clear: function () {
        //clears the whole canvas to redraw
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    },

    refreshCanvas: function () {

       this.interval = setInterval(updateCanvas, 20);

    },

    stop: function () {
        clearInterval(this.interval);
    }

  



}


//Defining an object type with a constructor function. Use an Initial Capital Letter
//x	The x-coordinate of the upper-left corner of the rectangle
//y The y-coordinate of the upper-left corner of the rectangle
function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.posX = x;
    this.posY = y;
    this.x = x;
    this.y = y;
    this.speed = 5;

    this.update = function () {
        //grab context from gameArea Object
        this.ctx = gameArea.context;

        this.ctx.fillStyle = this.color;
        //parameters , x,y,width , height
        //x	the x coordinate of the upper-left corner
        //same as x and y when game starts
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    this.checkCrash = function(otherComponent) {
        var myLeft = this.posX;
        var myRight = myLeft + this.width;
        var myTop = this.posY;
        var myBottom = myTop + this.height;

        var otherLeft = otherComponent.posX;
        var otherRight = otherLeft + otherComponent.width;
        var otherTop = otherComponent.posY;
        var otherBottom = otherTop + otherComponent.height;

        var crash = false;

        if ((myRight == otherLeft) || (myLeft == otherRight) || (myBottom == otherTop) || (myTop == otherBottom)) {
            crash = true;
        }

        return crash;
    }
    //this.newPos = function () {
    //    this.x += this.posX;
    //    this.y += this.posY;
    //}
}


function updateCanvas() {

    if (gameCube.checkCrash(obstacle)) {
        gameCube.update(); //refresh to crash state before stopping
        gameArea.stop();
    }
    else {

        //console.log(new Date().getMilliseconds());
        //clear before update. updates last 20 ms
        gameArea.clear();
        obstacle.update();
        gameCube.update();

    }


}

//functions to increment x and y coordinates
//y is distance from top left. less distance, the less its further
function moveUp() {

    if (gameCube.posY != 0) {
        gameCube.posY -= gameCube.speed;
    }

}


function moveDown() {
    if (gameCube.posY != (gameArea.canvasHeight - gameCube.height) ){
        gameCube.posY += gameCube.speed;
    } 
}

function moveLeft() {
    if (gameCube.posX != 0) {
        gameCube.posX -= gameCube.speed;
    }
    
}

function moveRight() {
    if (gameCube.posX != (gameArea.canvasWidth - gameCube.width)) {
        gameCube.posX += gameCube.speed;
    }
    
}


//myGameArea.clear = function () {

//    clear a rectangle within a given rectangle . this clears the whole canvas
//    aContext.clearRect(0, 0, canvasWidth, canvasHeight);
//}

//Angular Part

var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.cubeSpeedOptions = [
            { value: 1, name: 'Slow' },
            { value: 3, name: 'Medium' },
            { value: 8, name: 'Fast' },
    ];

    $scope.cubeSpeedChange = function () {
        gameCube.speed = $scope.selectedCubeSpeed['value'];
    }

});
