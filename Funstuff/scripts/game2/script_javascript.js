"use strict";

var canvas;
var ctx;
var canvas_width;
var canvas_height;
var cell_width;
var snake_array;
var direction;
var score;
var game_loop;

function init() {
    direction = "right";

    create_snake();
    create_food();

    score = 0;

    //timer that trigers paint function

    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
}

function create_snake() {
    //length of the snake
    var length = 5;

    //Empty array to start with
    snake_array = [];

    for (var i = length - 1; i >= 0; i--) {
        //horizontal snake starting from top left
        snake_array.push({ x: i, y: 0 });
    }

}

function create_food() {
    //object literal notation for an object with x and y
    // (450-10)/10  = 440/10 = 44
    //random member between 0-44 for x and y co-ordinates to place food
    food = {
        x: Math.round(Math.random() * ((canvas_width - cell_width) / cell_width)),
        y: Math.round(Math.random() * ((canvas_height - cell_width) / cell_width)),
    };
}

function paint() {


    ctx.fillStyle = "white";

    ctx.FillRect(0, 0, canvas_width, cell_height);

    ctx.strokeStyle = "black";

    //stroke - the  border around rectangle . hit for snake
    ctx.strokeRect(0, 0, w, h);


    //x and y of first cell
    var firstx = snake_array[0].x;
    var firsty = snake_array[0].y;

    //pushes the first cell start point by one based on direction
    //changes eithr x or y
    if (d == "right") {
        //moving left. add startx by 1;
        nx++;
    }
    else if (d == "left") {
        //moving left. reduce startx by 1;
        nx--;
    }
    else if (d == "up") {
        ny--;
    }
    else if (d == "down") {
        ny++;
    }
}

