

var page23 = function() {


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

    Array.prototype.rotate = (function() {
        // save references to array functions to make lookup faster
        var push = Array.prototype.push,
            splice = Array.prototype.splice;

        return function(count) {
            var len = this.length >>> 0, // convert to uint
                count = count >> 0; // convert to int

            // convert count to value in range [0, len[
            count = ((count % len) + len) % len;

            // use splice.call() instead of this.splice() to make function generic
            push.apply(this, splice.call(this, 0, count));
            return this;
        };
    })();

    if (debug) {
        $('#debugbox').css('display', 'block');
    };

    var lr = function(sel, rot) {

        var targsel = '#' + sel + ' pre';

        var targtext = $(targsel).text().split('');
        targtext.rotate(rot);
        targtext = targtext.join('').replace(/\n/g, '').match(/.{1,10}/g).join('\n');
        $(targsel).text(targtext);

    };

    $('#targettext').center();

    var t = $('#center').text();

    var alternator = function() {
        console.log('alternator');
        lr('left', 1); lr('right', -1);
    };

    // TODO: setTimeout and reset
    // so we can pause? maybe?
    var timer = setInterval(alternator, 100);

    // TODO: center column down/up line by line (click = reverse?)
    // TODO: change speed of auto-rotators?
    // TODO: change direction of auto-rotators?
    //       mmmmaybe when central text has completely looped around? "easter egg"

    // $('#left').on('click', function() { lr('left', 1); lr('right', -1); });


    $('#infobox').fadeOut(1000);


}();
