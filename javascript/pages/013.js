// for the blinking interval
var isPaused = false;
var origPause;
var startX;

//http://www.jquery4u.com/snippets/url-parameters-jquery/#.UHwna4ZU18E
function getUrlParam(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
return result && result[1] || "";
}

var debug = (getUrlParam('debug') == 'true');

// http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);


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

    if (debug) {
        $('#debugbox').css('display', 'block');
    };

    $('#targettext').center();


    
    var t = $('li');
    var row = 1;
    var col = 0;
    var maxCol = 5;
    
    $('li').each(function() {
        $(this).attr('data-sizex', 1).attr('data-sizey', 1).attr('data-col', (col % maxCol + 1)).attr('data-row', row);
        col++;
        if (col % maxCol == 0) {
                row++;
            }
        });

    
    // $('#center').html(newtext);

    $('ul').gridster({
        // widget_margins: [20, 20],
        widget_base_dimensions: [70, 70],
        min_cols: 5
    });
    
    $('#infobox').fadeOut(1000);
    
});

