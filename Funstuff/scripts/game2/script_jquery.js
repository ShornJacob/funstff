$(document).ready(function () {

    //Canvas stuff
    
    //get the dom object from the jquery object
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");

    //access the properties of element from jquery object
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    //cell width 
    var cw = 10;
    var d;
    var food;
    var score;


    var snake_array; //an array of cells to make up the snake
})