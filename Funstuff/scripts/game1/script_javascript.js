"use strict";



var gameCube;
var obstacles = [];
var myScore;





//object initializer. Literal notation . This creates an object myGameArea with properties
var gameArea = {


    start: function (gameCube) {
        //jQuery
        this.canvasWidth = $("#canvas1").attr("width");
        this.canvasHeight = $("#canvas1").attr("height");
        this.context = $("#canvas1")[0].getContext("2d");

        //keep track of frames.updated by refreshCanvas
        //bug fix  - set from 0 to 1.   0 caused check interval to be called
        this.frameNo = 1;

        this.pause = false;

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
//y The y-coordinate of the upper-left corner of the 
//for text width and heoght will be font and type
//for image color as image ssource
function Component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.posX = x;
    this.posY = y;
    this.x = x;
    this.y = y;
    this.speed = 5;

    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.update = function () {
        //grab context from gameArea Object
        this.ctx = gameArea.context;

        //check if component id text or Rect

        if (this.type == "text") {
            this.ctx.font = this.width + " " + this.height;
            this.ctx.fillStyle = color;
            this.ctx.fillText(this.text, this.x, this.y);
        }
        else if (this.type == "image") {
            this.ctx.drawImage(this.image, this.posX,this.posY,this.width, this.height)
        }
        else {
            this.ctx.fillStyle = this.color;
            //parameters , x,y,width , height
            //x	the x coordinate of the upper-left corner
            //same as x and y when game starts
            this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        }
       
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

        var crash = true;

        if ((myRight < otherLeft) || (myLeft > otherRight) || (myBottom < otherTop) || (myTop > otherBottom ) ) {
            crash = false
        }

        return crash;
    }
    //this.newPos = function () {
    //    this.x += this.posX;
    //    this.y += this.posY;
    //}
}


function updateCanvas() {

    //if in pause mode , dont update anything
    if (gameArea.pause == true) {
        return;
    }


    //obstacle Position X and Y
    var obsposX;
    var obsposY;

  


    //check for crash
    for(var i = 0; i < obstacles.length; i += 1) {

        if(gameCube.checkCrash(obstacles[i])) {
            //cube crashed to obstacle
            //update and refresh to crash state before stopping
            gameArea.clear();   
            gameCube.update();
            obstacles[i].update();
            gameArea.stop();
            return
        }
    }

    //no crash, game continues in the frame 

    //Displays frame on browser console. For Debug.
    //console.log(new Date().getMilliseconds());


  

    //clear before update.
    gameArea.clear();

    //create a new obstacle on 1st frame and then on interval
    if (gameArea.frameNo == 1 || checkInterval(150)) {

        var startX = parseInt(gameArea.canvasWidth);

        var canvasHeight = parseInt(gameArea.canvasHeight);

        var obsTopMin = 20;

        var obsTopMax = 200;

        var obsTopHeight = Math.floor(Math.random() * (180 + 1)) + obsTopMin;


        var obsMinGap = 50;

        var obsMaxGap = 200;

        var gapHeight = Math.floor(Math.random() * (150 + 1)) + obsMinGap;

        var obsBottomHeight = canvasHeight - obsTopHeight - gapHeight; //Bottom obstacle

        //if bottom height is negative, no room for bottom obstacle
        obsBottomHeight = obsBottomHeight < 0 ? 0 : obsBottomHeight
     
        var obsBottomX = startX; //both obstacles start at same X location

        var obsBottomY = obsTopHeight + gapHeight; //height of top obstacle plus gap height
      

        //position a obstacle in end of canvas. this is for top left point
        //obsposX = parseInt(gameArea.canvasWidth) //canvas Width returned as string
        //obsposY = gameArea.canvasHeight - 200;

        //top obstacle. starts at top of canvas.startx = canvasWidth(end of canvas). y =0  starts from top
        obstacles.push(new Component(10, obsTopHeight, "red", startX, 0));

        obstacles.push(new Component(10, obsBottomHeight , "red", obsBottomX, obsBottomY));
    }


    //each obstacle moves left every frame
    for(var i = 0; i < obstacles.length; i += 1) {

        //move obstacle left
        obstacles[i].posX += -1;
        obstacles[i].update();
    }

    //set score and update
    myScore.text = " SCORE: " + gameArea.frameNo;
    myScore.update();
            
    //increment framecount register
    gameArea.frameNo += 1;

    gameCube.update();
}




//functions to increment x and y coordinates
//y is distance from top left. less distance, the less its further
function moveUp() {

    if (gameCube.posY != 0) {
        gameCube.image.src = "../Images/plane_up.png";
        gameCube.posY -= gameCube.speed;
    }
}


function moveDown() {
    if (gameCube.posY != (gameArea.canvasHeight - gameCube.height)) {

        gameCube.image.src = "../Images/plane_down.png";
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

function clearMove() {
    gameCube.image.src = "../Images/plane.png"
}

function checkInterval(n) { 
    if ((gameArea.frameNo / n) % 1 == 0) { return true; }

    return false;
}

function pauseGame() {

    //terniatry operator for pausing, resuming
    gameArea.pause == true ? gameArea.pause = false : gameArea.pause = true;
}




