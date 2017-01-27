$(document).ready(function () {

    //Canvas stuff
    
    //get the dom object from the jquery object
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");

    //access the properties of element from jquery object
    canvas_width = $("#canvas").width();
    canvas_height = $("#canvas").height();

    init();

    $(document).keydown(function (e) {
        var key = e.which;

        if (key == "37" && direction != "right") direction = "left";
        else if (key == "38" && direction != "down") direction = "up";
        else if (key == "39" && direction != "left") direction = "right";
        else if (key == "40" && direction != "up") direction = "down";
    })

})