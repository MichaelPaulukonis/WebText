
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

    $('#text-wrap').center();

    $('.ginormous').center();

    $('.ginormous').draggable({
        revert: true
        , revertDuration: 2000
        , scroll: false
    });
    
    // // fade out the info box, then pulse the "mustshow" text(s)
    // // five seconds seems reasonable
    // // TODO: do we want to set/check a cookie to not display after the first few times?
        // $('#infobox').fadeOut(5000, function() { $('#mustshow').effect('pulsate', { times: 3 }, 2000); });
    $('#infobox').fadeOut(5000);
    
});

