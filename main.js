window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

function Check(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13) {
        e.preventDefault();
    }
}

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var color = document.getElementById("colo");
var yname = document.getElementById("textbox");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;
color.innerHTML = "#00ff00";
yname.innerHTML = "Bob, Bob JR";

var imagedata = ctx.getImageData(0, 0, c.width, c.height);


var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain

//an array of drops - one per column
var drops = [];

//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++) {
    drops[x] = {
        x: Math.floor(Math.random() * window.innerHeight + 1) + 1,
        name: "You are awesome",
        loop: Math.floor(Math.random() * "You are awesome".length + 1) + 1
    };
}
//drawing the characters
var loop = 0;

function draw() {
    c.height = window.innerHeight;
    c.width = document.body.clientWidth;

    ctx.putImageData(imagedata, 0, 0);

    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = color.innerHTML; //green text
    ctx.font = "800 " + font_size + "px 'Andale Mono'";

    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        var text;
        if (drops[i].name[drops[i].loop] == " ") {
            if (drops[i].loop >= drops[i].name.length-1) {} else {
                drops[i].loop++;
                drops[i].x++;
            }
            text = drops[i].name[drops[i].loop];
        } else {
            text = drops[i].name[drops[i].loop];
        }
        ctx.fillText(text, i * font_size, drops[i].x * font_size * 0.8);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i].x * font_size > c.height && Math.random() > 0.975)
            drops[i].x = 0;

        //incrementing Y coordinate
        drops[i].x++;
        drops[i].loop++;

        if (drops[i].loop >= drops[i].name.length) {
            var ynames = yname.innerHTML;
            var splitt = ynames.split(", ");
            drops[i].loop = 0;
            drops[i].name = splitt[Math.floor(Math.random() * splitt.length)] + "_ ";
        }
    }
    imagedata = ctx.getImageData(0, 0, c.width, c.height);
}

var timer = 0;
(function animloop() {
    requestAnimFrame(animloop);

    if (timer == 5) {
        draw();
        timer = 0;
    }
    timer++;
})();