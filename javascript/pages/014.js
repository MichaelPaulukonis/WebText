var page14 = function() {

    // turn 'NO' on/off....
    var alternate = function() {

        var opc;

        var visible = (no.css('opacity') == white);

        opc = (visible ? black : white);
        
        no.animate({
            opacity: opc
        }, 1000, null );
        
    };

    $('#jswarning').remove();
    
    // these are opacity values
    var white = 1;
    var black = 0;

    // it's the word 'no'. clever ID and variable name, no?
    var no = $('#no');

    no.css('opacity', black);
    $(document).bind('keydown', 'space', alternate );
    $('#infobox').fadeOut(5000);

};



$(document).ready(function() {

    page14();

});




