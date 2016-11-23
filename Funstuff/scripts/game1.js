"use strict";

var gameCube;

$(document).ready(function () {

    //create object from constructor function
    gameCube = new Component(30, 30, "red", 10, 120);
    gameArea.start(gameCube);

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
       
        setInterval(updateCanvas, 20);

    }

   

}


//Defining an object type with a constructor function. Use an Initial Capital Letter
//x	The x-coordinate of the upper-left corner of the rectangle
//y The y-coordinate of the upper-left corner of the rectangle
function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.update = function () {
        //grab context from gameArea Object
        this.ctx = gameArea.context;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function updateCanvas() {
    console.log(new Date().getMilliseconds());
    //clear before update. updates last 20 ms
    gameArea.clear();
    gameCube.update();
    gameCube.x += 1;
    
}
//myGameArea.clear = function () {

//    clear a rectangle within a given rectangle . this clears the whole canvas
//    aContext.clearRect(0, 0, canvasWidth, canvasHeight);
//}



