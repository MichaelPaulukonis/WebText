// for the blinking interval
var startX;

//http://www.jquery4u.com/snippets/url-parameters-jquery/#.UHwna4ZU18E
function getUrlParam(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && result[1] || "";
}
// http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
(function($){
    $.fn.disableSelection = function() {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };
})(jQuery);


var debug = (getUrlParam('debug') == 'true');

var textCount = parseInt(getUrlParam('count'), 10);
// TODO: if not provided, default to ALL
textCount = (isNaN(textCount) ? Number.MAX_VALUE : textCount);
var targetTag = 'li';

// now, duplicate the list, and sort it INVERTED for the color-stack...


$(document).ready(function() {

    if (debug) {
        $('#debugbox').css('display', 'block');
    };


    $('span').approach({'color': '#FFFFFF'}, 120);
    
    $('#infobox').fadeOut(5000);
    
});
