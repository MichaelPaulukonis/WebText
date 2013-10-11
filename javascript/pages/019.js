$(document).ready(function() {

    page19();

});


var page19 = function() {


    var direction = { up: 1, down: -1 };

    var spin = function(letter, vector) {

        var initCode = letter.text().charCodeAt(0);

        // loop 48..90: 42 range
        // String.fromCharCode(i)
        // (i % 43) + 48 := 48..89
        // so... OFF BY ONE

        var min = 48;
        var max = 90;
        var p = (max - min + 1);
        var mod = (vector + initCode - min) % p;
        if (mod < 0) { mod += p ; }

        letter.text(String.fromCharCode(min + mod));

    };

    var letts = $('.largelett');

    $('#infobox').fadeOut(3000);

    $('#displayarea').center();

    var spinit = function(target, vector, delay) {
        spin(target, vector);
        setTimeout(function() {spinit(target, vector, delay);}, delay);
    };
    
    spinit($(letts[0]), direction.down, 200);
    spinit($(letts[1]), direction.down, 700);
    spinit($(letts[2]), direction.down, 1400);
    spinit($(letts[3]), direction.down, 5000);

};
