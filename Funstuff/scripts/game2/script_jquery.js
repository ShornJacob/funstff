﻿$(document).ready(function () {

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

    function create_snake()
    {
        //length of the snake
        var length = 5;

        //Empty array to start with
        snake_array = [];

        for(var i=length-1; i>=0; i--)
        {
            //horizontal snake starting from top left
            snake_array.push({ x: i, y: 0 });
        }

    }

    function create_food()
    {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw),
        };
    }

    function init() {

        //default direction
        d = "right";
    }
})