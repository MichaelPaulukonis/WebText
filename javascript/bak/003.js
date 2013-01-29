$(document).ready(function() {

    var bg = document.getElementById('background');
    if (bg) {
        bg.src = "./background_images/hearts.gif";
    }

    $('h1:not([class])').css('display', 'none');


    $('h1').bind('click', function(e){
        var next = $(this).next('h1');

        if (next.length == 0) {
            next = $('h1').first();
        }
        
        $('.active').removeClass('active').css('display', 'none');
        next.addClass('active').css('display', 'block');

    });
    
});