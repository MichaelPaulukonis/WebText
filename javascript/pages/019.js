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

    var l0 = function() {

        spin($(letts[0]), direction.down);
        setTimeout(l0, 200);

    };

    l0();

    var l1 = function() {
        spin($(letts[1]), direction.down);
        setTimeout(l1, 700);
    };



    l0();
    l1();
    l2();
    l3();

    // var l1 = setInterval(function() {

    //     spin($(letts[1]), direction.down);

    // }, 700);

    // var l2 = setInterval(function() {

    //     spin($(letts[2]), direction.up);

    // }, 100);

    // var l32 = setInterval(function() {

    //     spin($(letts[3]), direction.up);

    // }, 2000);


};
