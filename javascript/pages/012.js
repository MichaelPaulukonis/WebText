var isPaused = false;
var pages = [];
var speedIncr = 50;
var anim;
var direction = { forward: 1,
                  reverse: -1
                };
var curDirection = direction.forward;

//http://www.jquery4u.com/snippets/url-parameters-jquery/#.UHwna4ZU18E
function getUrlParam(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && result[1] || "";
}

var debug = (getUrlParam('debug') == 'true');

var speed = parseInt(getUrlParam('speed'), 10);
speed  = (isNaN(speed) ? 100 : speed);
var curFrame = parseInt(getUrlParam('frame'), 10);
curFrame = (isNaN(curFrame) ? 0 : curFrame);


// http://stackoverflow.com/a/210733/41153
jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
};

$(document).ready(function() {


    pages = getPages();

    if (curFrame > pages.length) { curFrame = 0; }
    
    $('#displaypage').html(pages[curFrame]);

    $('pre').center();

    // TODO: redefine this when speed changes....
    var anim = setInterval(displayNext, speed);

    $(document).bind('keydown', 'space', spaced );
    $(document).bind('keydown', 'up',    increaseSpeed);
    $(document).bind('keydown', 'down',  decreaseSpeed);
    $(document).bind('keydown', 'left',  backwardFrame);
    $(document).bind('keydown', 'right', forwardFrame);

    $('#infobox').fadeOut(5000);

});

var getPages = function() {

    var text = $('#textsource')[0].innerHTML;
    var pages = text.split('\n\n');

    return pages;
    
};

var spaced = function() {

    isPaused = !isPaused;
    
};

var forwardFrame = function() {

    curDirection = direction.forward;

    if (!isPaused) {
        return;
    }

    curFrame += curDirection;
    display();
    
};

var backwardFrame = function() {

    curDirection = direction.reverse;

    if (!isPaused) {
        return;
    }
    
    curFrame += curDirection;
    display();
    
    
};

var displayNext = function() {

    if (isPaused) { return; }

    curFrame += curDirection;

    display();
    
};


var display = function() {

    if (curFrame >= pages.length ) { curFrame = 0; }
    if (curFrame < 0) { curFrame = pages.length -1; }

    $('#displaypage').html(pages[curFrame]);

};

var decreaseSpeed = function() {

    speed += speedIncr;

    if (speed > 1000) { speed = 1000; }

    setSpeed();
    
};

var increaseSpeed = function() {

    speed -= speedIncr;

    if (speed < 0) { speed = 1; }

    setSpeed();
    
};

var setSpeed = function() {

    clearInterval(anim);

    anim = setInterval(displayNext, speed);
    
};

// TODO: right/left arrows go forward/revertse
// if paused, adjusts curFrame

// TODO: debug info
// contains speed, curFrame

// TODO: help bar/ notes
