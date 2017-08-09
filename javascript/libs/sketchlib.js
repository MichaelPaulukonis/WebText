// assumes that jQuery has been defined
// I suppose there should be some check for that.....

// http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
(function($){
    $.fn.disableSelection = function() {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };
})(jQuery);


// http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
// usage: $('#content').center();
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


var SketchLib = function() {

    // deprecated (not even exposed right now)
    // http://www.jquery4u.com/snippets/url-parameters-jquery/#.UHwna4ZU18E
    var getUrlParam = function(key){
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && result[1] || "";
    };

    var _opts = {};

    // return null, so callers can sustitue a default if undefined
    var getOption = function(key) {
        return _opts[key] || null;
    };

    var initOptions = function() {

        // skip over the first char = '?'
        var params = (window.location.search.substr(1)).split('&');

        for (var i = 0; i < params.length; ++i) {
            var a = params[i].split('=');
            var key = a[0];
            var value = a[1] || ''; // don't choke if =[value] is missing
            _opts[key] = value;
        }
    };


    // define console.log when it is not defined (ie, IE w/o dev tools open)
    if (!window.console) {window.console = {log: function(msg) {}};}
    var log = function(msg) {
        console.log(msg);
    };

    // options need to be initialized before debug code is read
    // so, that needs to be sequential
    // I'd prefer to keep setup next to the method declarations
    // but maybe that isn't a good idea....

    initOptions();

    // capture once
    // this is a common option to check, so is captured statically and exposed seperately from the _opts/GetOption method
    var _debug = (_opts.debug === true);
    if (_debug) {
        var dbgbox = $('#debugbox');
        if (dbgbox) {
            dbgbox.css('display', 'block');
        }
    }

    return {  Debug: _debug,
              GetOption: getOption,
              // GetUrlParam: getUrlParam,
              Log : log
           };

}();

// // TODO: make sure this will work with all extant pages using sketchlib....
// TODO: local pages should be able to override values
// f'r instance, 017 needs to have an opacity of 0.85 due to colors....
// $(document).ready(function() {

//   // preliminary hide/show code for "new" info-box at bottom of page
//   var infoDisappear = function($this) {
//     $this.stop().animate({bottom: infoBottom, opacity: 0.01}, 'slow');
//     console.log('disappeared');
//   };

//   var infoAppear = function($this) {
//     $this.stop().animate({bottom: 0, opacity: 0.75}, 'slow');
//     console.log('appeared');
//   };

//   var $info = $('#info'),
//       infoBottom = $info.css('bottom');
//   $info.mouseenter(function() { infoAppear($info); }).mouseleave(function() { infoDisappear($info); });

//   infoAppear($info);
//   $info.fadeTo(10000, 0.01);

// });
