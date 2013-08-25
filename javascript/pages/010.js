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

    var lineHeight = parseInt(getUrlParam('height'), 10);
    lineHeight = (isNaN(lineHeight) ? '3px' : lineHeight + 'px');
    
    $("<style type='text/css'> span, li { line-height: " + lineHeight + ";} </style>").appendTo("head");

    // TODO: centering is only full-window
    // if an element is the width of the full-window
    // OUCH
    // TODO: center the containing element
    // TOOD: update the element ids and css appropriately
    
    
    // mostly works, except for "select all" which is good enough
    $(targetTag).disableSelection();

    selectAndRecolor($('li'), textCount);
    // recolorAndShow($('li'));
    sortbylength($('li'));
    
    // makeDraggable(items);
    // makeDraggable($('li'));
    
    // $(document).bind('keydown', 'space', keyed );
    
    $('#infobox').fadeOut(5000);
    
});

var selectAndRecolor = function(items, itemCount) {

    items.css('display', 'none');

    // // randomize all elems [execpt mustshow], get 25 [thus, a random selection], and then include the page's mustshow
    // // this ensures that mustshow will appear once and only once
    // // assuming it's not invisible or something. that happens.
    items = items.not('.mustshow').get().sort(function(){
        return Math.round(Math.random())-0.5;
    }).slice(0,itemCount).concat($('.mustshow')[0]);

    recolorAndShow(items);

    // get rid of the rest of the items
    $(items).remove(':hidden');

    return items;
    
};

var makeDraggable = function(items) {

    $.each(items, function() {
        $(this).draggable(
            {cursor: "move",
             stack: targetTag,
             opacity: 1

             , handle: 'span'

             , drag: function(){
                 
                 var offset = $(this).offset();
                 var xPos = offset.left;
                 
                 var top = $(this).css('top');

                 var text = '<br /> top: ' + top;
                 text += '<br /> left: ' + xPos;
                 
                 $('#debuginfo').html(text);
                 
             }

             , start: function() {
                 
             }
             
             , stop: function(){
                 // there is no here here, anymore
             }

            });
    });
    
};

// found @ http://blog.roberthallam.org/2011/06/sort-a-list-using-query/
// original version passed in the parent element
// which presumes more knowledge than this code needs
var sortbylength = function($elements) {

    var listitems = $elements;

    listitems.sort(function(a, b) {
        var compA = a.innerHTML.length;
        var compB = b.innerHTML.length;
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    
    $.each(listitems, function(idx, itm) { $elements.parent().append(itm); });
    
};

// TODO: would be nice to be able to select some color "schemes" or families....
// TODO: test these ranges sometime
var recolorAndShow = function(items) {

    $.each(items, function () {
        
        var textColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';

        $(this).css({  'color': textColor
                       , 'display' : 'block'
                       // , 'opacity' : '0.5'
                    });
        
    });

};



