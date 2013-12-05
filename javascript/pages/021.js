
//http://www.jquery4u.com/snippets/url-parameters-jquery/#.UHwna4ZU18E
function getUrlParam(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
return result && result[1] || "";
}

var debug = (getUrlParam('debug') == 'true');

// http://stackoverflow.com/a/210733/41153
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

    // $('#content').center();
    // TODO: random start positions

    // TODO: inertia? would only work for Monkey on a tablet....

    $('.imagedrag').draggable({
        scroll: false
        , stack: '.imagedrag'
        // , grid: [9.6, 19]
    });
    
    // $('#infobox').fadeOut(5000);
    
});

