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
textCount = (isNaN(textCount) ? 50 : textCount);
var targetTag = 'li';


$(document).ready(function() {

    if (debug) {
        $('#debugbox').css('display', 'block');
    };

    var lineHeight = parseInt(getUrlParam('height'), 10);
    lineHeight = (isNaN(lineHeight) ? '15px' : lineHeight + 'px');
    
    $("<style type='text/css'> span, li { line-height: " + lineHeight + ";} </style>").appendTo("head");

    
    // mostly works, except for "select all" which is good enough
    $(targetTag).disableSelection();
    
    var items = reduceAndRecolor();

    duplicateOnRight(items, $('#rightlist'));
    
    // makeDraggable(items);
    makeDraggable($('li'));
    
    // $(document).bind('keydown', 'space', keyed );
    
    $('#infobox').fadeOut(5000);
    
});

var reduceAndRecolor = function() {

    $(targetTag).css('display', 'none');

    // // randomize all elems [execpt mustshow], get 25 [thus, a random selection], and then include the page's mustshow
    // // this ensures that mustshow will appear once and only once
    // // assuming it's not invisible or something. that happens.
    var items = $(targetTag).not('.mustshow').get().sort(function(){
        return Math.round(Math.random())-0.5;
    }).slice(0,textCount).concat($('.mustshow')[0]);

    var i = 0;
    $.each(items, function() {
        setAlignClass($(this), 'left');
        // this is an identifier to help us match left::right
        // also, we can find the item in the original source code more readily, if we feel like it
        $(this).addClass('text_' + i);
        $(this).css('top', 0);
        i++;
    });
    
    recolorAndShow(items);

    // get rid of the rest of the items
    $(targetTag + ':hidden').remove();
    
    sortbylength($('.left'));

    return items;
    
};

var setAlignClass = function(elem, cls) {

    $(elem).addClass(cls);
    
};


var makeDraggable = function(items) {

    $.each(items, function() {
        $(this).draggable(
            {cursor: "move",
             stack: targetTag,
             opacity: 1

             , handle: 'span'

             , drag: function(){

                 var cls = getItemClass($(this));
                 var alignClass = getAlignClass($(this));
                 var reflectClass = (alignClass == 'right' ? 'left' : 'right');
                 var leftOffset = (reflectClass == 'right' ? 60 : 0);
                 var reflectSelector = '.' + reflectClass + '.' + cls;
                 
                 var offset = $(this).offset();
                 var xPos = offset.left;
                 
                 var r = $(reflectSelector);
                 var top = $(this).css('top');
                 var newLeft = -xPos + leftOffset;
                 
                 r.css({'left': newLeft,
                        'top': top,
                        'position': 'relative'});

                 
                 var otop = $(reflectSelector).css('top');

                 var text = '<br /> top: ' + top + '<br/> oTop: ' + otop;
                 text += '<br /> left: ' + xPos + '<br / > oLeft: ' + newLeft;
                 
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

var getAlignClass = function(elem) {
    var cls = '';

    var classList = elem.attr('class').split(/\s+/);
    $.each( classList, function(index, item){

        if (item == 'right' || item == 'left' ) {
            cls = item;
        }
    });
    
    return cls;
    };


var getItemClass = function(elem) {

    var cls = '';
    
    var classList = elem.attr('class').split(/\s+/);
    $.each( classList, function(index, item){

        // return this.indexOf(str) == 0;
        if (item.indexOf('text_') == 0) {
            cls = item;
        }
    });

    return cls;
    
};


var duplicateOnRight = function(items, targlist) {

    $.each(items, function() {

        var r = $(this).clone();

        $(r).removeClass('left');
        $(r).addClass('right');
        
        $(r).appendTo(targlist);
        
    });

    sortbylength($('.right'));
    // makeDraggable($('.right'));
    
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

    // var width = $('#leftlist').width();
    var width = $('#targettext').width();

    $.each(items, function () {
        
        var textColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';

        $(this).css({  'color': textColor
                       , 'display' : 'block'
                       , 'opacity' : '0.5'
                       // , 'width'   : width
                    });
        
    });

};



