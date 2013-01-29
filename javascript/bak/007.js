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


    
    var t = $('#center').text(); 
    var row = 1;
    var col = 0;
    var maxCol = 20;
    
    var text = t.replace(/\n/g, '').split('');
    var newtext = '<ul>\n';
        for ( var i = 0; i < text.length; i++ ) {
                var e = "<li class='char' data-sizex='1' data-sizey='1' data-col='" + (col % maxCol +1 ) + "' data-row='" + row + "' >" + text[i] + "</li>";
            newtext += e + '\n';
            col++;
            if (col % maxCol == 0) {
                row++;
            }
        }
    newtext += '</ul>';

    $('#center').html(newtext);

    $('.gridster > ul').gridster({
        widget_margins: [0, 1],
        widget_base_dimensions: [8.5, 16],
        min_cols: 5
    });
    
    $('#infobox').fadeOut(1000);
    
});

