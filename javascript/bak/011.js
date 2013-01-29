var isPaused = false;

$(document).ready(function() {

    $('#content h1:not([class])').css('display', 'none');

    var flasher = setInterval(displayNext, 10);

    $(document).bind('keydown', 'space', keyed );

    $('#infobox').fadeOut(5000);

});

var keyed = function() {

    isPaused = !isPaused;
    
};

var displayNext = function() {

    if (isPaused) { return; }
    
    var next = $('.active').next('h1');

    if (next.length == 0) {
        next = $('#content h1').first();
    }
    
    $('.active').removeClass('active').css('display', 'none');
    next.addClass('active').css('display', 'block');
};