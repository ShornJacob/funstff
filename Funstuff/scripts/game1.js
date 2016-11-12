$(document).ready(function () {
    $("#but1").click(function () {
        //$("#paraid").toggle(1000);
        //$("#div1").slideToggle();
        //$("#div2").fadeToggle("slow");
        //$("#div3").fadeToggle(3000);

        $("#element1").animate({left: '+=250px'});
        $("#element1").animate({top: '+=250px'});
        $("#element1").animate({left: '-=250px'});
        $("#element1").animate({top: '-=250px'});   
    })



    $("#but2").click(function () {
       
        $("#div1").fadeTo("slow",0.15);
        $("#div2").fadeTo("slow", 0.4);
        $("#div3").fadeTo("slow", 0.7);
    });

    $("p").on({
        mouseenter: function () {
            $(this).css("background-color", "lightgray");
        },

        mouseleave: function () {
            $(this).css("background-color", "lightblue");
        },

        click: function () {
            $(this).css("background-color", "yellow")
        }
    });

    $("input").on({
        focus: function () {
            $(this).css("background-color", "#cccccc");
        },

        blur: function () {
            $(this).css("background-color", "#ffffff");
        }

    
    });


});

   

//$("p").click(function () {
//    $(this).hide();
//});



//var draw = function () {
//    var canvas = document.getElementById("tutorial");
//    var ctx = canvas.getContext("2d");

//    ctx.fillStyle = "green";
//    ctx.fillRect(10, 10, 100, 100);
//}

