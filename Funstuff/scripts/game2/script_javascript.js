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
var food;
var pause;

function init() {
    pause = false;
    direction = "right";
    cell_width = 10;

    create_snake();
    create_food();

    score = 0;

    //timer that trigers paint function

    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
}

//done only once, not called in refresh
//first array element is 4,0  which is the last cell(head) of snake. snake is painted from head to back
function create_snake() {
    //length of the snake
    //check with a greater number like 25 for collison to itself test
    var length = 5;

    //Empty array to start with
    snake_array = [];

    for (var i = length - 1; i >= 0; i--) {
        //horizontal snake starting from top left. head is first cell. tail is last
        snake_array.push({ x: i, y: 0 });
    }

}

//random coordinates for food. does not paint them
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

    //if in pause mode , dont update anything
    if (pause == true) {
        return;
    }


    ctx.fillStyle = "white";

    ctx.fillRect(0, 0, canvas_width, canvas_height);

    ctx.strokeStyle = "black";

    //stroke - the  border around rectangle . hit for snake
    ctx.strokeRect(0, 0, canvas_width, canvas_height);


    //x and y of next move
    //snake_array[0] is the head, first to be drawn
    var nextx = snake_array[0].x;
    var nexty = snake_array[0].y;

    //pushes the first cell start point by one based on direction
    //changes eithr x or y
    if (direction == "right") {
        //moving left. add startx by 1;
        nextx++;
    }
    else if (direction == "left") {
        //moving left. reduce startx by 1;
        nextx--;
    }
    else if (direction == "up") {
        nexty--;
    }
    else if (direction == "down") {
        nexty++;
    }

    //paint snake. head is drawn first. tail is last
    for(var i=0;i<snake_array.length;i++)
    {
        var c = snake_array[i];

        paint_cell(c.x, c.y);
    }

    //food also has to be refreshed
    paint_cell(food.x, food.y);


    //if snake hits food
    if(nextx == food.x && nexty==food.y) {
        //snake grows
        //name tail is used just so that it uses the same variable in else part. should be named head
        var tail = { x: food.x, y: food.y }
        //create new food if snake hits the food
        create_food()
    }
    else {
        //move where sname does not grow
        //pops out the last array cell of snake ,drawn last. since snake moves. 
        var tail = snake_array.pop();

        //reuses the tail object and sets its x and y (the next head, tail becomes the next head) . sets it to the next cell whre snake should be moving
        tail.x = nextx;
        tail.y = nexty;
    }
  

    //unshift is a js function. instead of push it puts elemnets to 0 location. first cell to be drawn
    //when food is consumed tail is food location. makes it first cell to be drawn. in this case it should have been called head since this is the first cell to be snake array and first to be drawn
    snake_array.unshift(tail);


    //check hitting the wall
    if (nextx == -1 || nextx == canvas_width / cell_width || nexty == -1 || nexty == canvas_height / cell_width || check_collision(nextx, nexty,snake_array) ) {

        //restart game
        init();
        return;
    }
}

//x and y 0-44
function paint_cell(x,y)
{
    ctx.fillStyle = "blue";

    //cell_width set at 10
    ctx.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
}

function check_collision(x,y, array)
{
    //Check if x or y exists in array
    //Or if the nextx abd nexty is in sname array. ie if the sname if moving to itself
    //return true if collision

    //starts from 1. 0 index contains next move co-ordinates which  when checked causes collison
    for(var i = 1; i < array.length; i++)
    {
        if (array[i].x == x && array[i].y == y) return true;
    }

    return false
}

function pauseGame() {

    //terniatry operator for pausing, resuming
    pause == true ? pause = false : pause = true;
}