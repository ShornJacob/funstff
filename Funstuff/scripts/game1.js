"use strict";

var aContext;
var canvasWidth;
var canvasHeight;

$(document).ready(function () {

    myGameArea.start();

    setInterval(updateGameArea);
});


var myGameArea = new Object();

myGameArea.start = function () {
    canvasWidth = $("#canvas1").attr("width");
    canvasHeight = $("#canvas1").attr("height")
    aContext = $("#canvas1")[0].getContext("2d");
    }

myGameArea.clear = function () {

    //clear a rectangle within a given rectangle . this clears the whole canvas
    aContext.clearRect(0, 0, canvasWidth, canvasHeight);
}

function updateGameArea() {   
    refreshCanvas(30, 30, "red", 10, 120);
}

function refreshCanvas(width, height, color, x, y) {
  
    aContext.fillStyle = color;
    //x	The x-coordinate of the upper-left corner of the rectangle
    //y The y-coordinate of the upper-left corner of the rectangle
    aContext.fillRect(x, y, width, height);
}

