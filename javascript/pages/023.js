

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

    // from http://stackoverflow.com/questions/1985260/javascript-array-rotate
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

    // TODO: there's no reason to grab the text each time
    // grab it once (external to func)
    // keep it
    // render it to the page
    var lr = function(sel, rot) {

        var targsel = '#' + sel + ' pre';

        var targtext = $(targsel).text().split('');
        targtext.rotate(rot);
        targtext = targtext.join('').replace(/\n/g, '').match(/.{1,10}/g).join('\n');
        $(targsel).text(targtext);

    };

    var t = $('#center').text();

    var alternator = function() {
        lr('left', 1); lr('right', -1);
    };

    // TODO: setTimeout and reset
    // so we can pause? maybe?
    var timer = setInterval(alternator, 100);

    // TODO: so... what about...
    // only displaying 20 items in the array....
    var linerot = function() {

        // targtext.rotate(1);
        var rotregex = new RegExp('.{1,' + centerLimit + '}', 'g'),
            rottext = '', i;

        for (i = 0; i < centerLimit; i ++) {
            var index = (i + offset) % targtext.length;
            rottext += targtext[index];
        };

        offset = (offset + 1) % targtext.length;

        rottext = rottext.replace(/\n/g, '').match(rotregex).join('\n');
        $('#center pre').text(rottext);

    };

    var centerLimit = 20,
        offset = 0,
        targtext = $('#centerblock').text().split('\n');
    linerot(); // initial population

    var target = $('#targettext');

    var autoRotate = function() {

        linerot();
        var rotinv = window.setInterval(linerot, 500);
        target.on('mouseleave', function() { window.clearInterval(rotinv); });

    };

    // rotate on mouseenter AND click; why not both!
    target.on('mouseenter', autoRotate);
    target.on('click', linerot);

    //    // TODO: change speed of auto-rotators?
    // TODO: change direction of auto-rotators?
    //       mmmmaybe when central text has completely looped around? "easter egg"

    target.center();

    var displayinfo = function() {

        // preliminary hide/show code for "new" info-box at bottom of page
        var infoDisappear = function($this) {
            $this.stop().animate({bottom: infoBottom, opacity: 0.001}, 'slow');
            console.log('disappeared');
        };

        var infoAppear = function($this) {
            $this.stop().animate({bottom: 0, opacity: 0.75}, 'slow');
            console.log('appeared');
        };

        var $info = $('#infobox'),
            infoBottom = $info.css('bottom');
        $info.mouseenter(function() { infoAppear($info); }).mouseleave(function() { infoDisappear($info); });

        $('.description').html('&#171; ' + document.title + ' &#187;');
        infoAppear($info);
        $info.fadeTo(10000, 0.001);



    }();

}();
