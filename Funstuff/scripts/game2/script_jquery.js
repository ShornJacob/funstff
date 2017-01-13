$(document).ready(function () {

    //Canvas stuff
    
    //get the dom object from the jquery object
     canvas = $("#canvas")[0];
     ctx = canvas.getContext("2d");

    //access the properties of element from jquery object
    canvas_width = $("#canvas").width();
    canvas_height = $("#canvas").height();

    init();
})