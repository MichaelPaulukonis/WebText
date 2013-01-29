$(document).ready(function() {

    page15();


});

// text is black-on-black by default
// cycle through list (random order)
// changing current text to white, previous to black
var page15 = function() {

    var isPaused = false;

    var keyed = function() {

        isPaused = !isPaused;
            
        };

    var texts = $('#content span');
    var current = 0;

    var displayNext = function() {

        if (isPaused) { return; }
        
        var next = $('.active').next('span');

        if (next.length == 0) {
            next = $('#content span').first();
        }
        
        $('.active').removeClass('active');
        next.addClass('active');
    };


    // TODO: build a randomized list of elements
    // go through that list....

    var flasher = setInterval(displayNext, 400);

    $(document).bind('keydown', 'space', keyed );

    $('#infobox').fadeOut(5000);

    
};

