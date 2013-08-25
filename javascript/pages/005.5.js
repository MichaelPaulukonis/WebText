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


$(document).ready(function() {

    if (debug) {
        $('#debugbox').css('display', 'block');
    };


    $('li').disableSelection();
    
    
    $('li').css('display', 'none');

    // // randomize all elems [execpt mustshow], get 25 [thus, a random selection], and then include the page's mustshow
    // // this ensures that mustshow will appear once and only once
    // // assuming it's not invisible or something. that happens.
    var items = $('li').not('.mustshow').get().sort(function(){
        return Math.round(Math.random())-0.5;
    }).slice(0,50).concat($('.mustshow')[0]);

    
    recolorAndShow(items);

    // get rid of the rest of the items
    $('li:hidden').remove();
    
    sortbylength($('#text-wrap'));

    $.each(items, function() {
        $(this).draggable(
            {cursor: "move",
             stack: 'li',
             // containment: 'parent',
             opacity: 1

             ,handle: 'span'

             , drag: function(){
                 var offset = $(this).offset();
                 var xPos = offset.left;
                 var yPos = offset.top;

                 var text = 'x: ' + xPos + '<br/>' + 'y: ' + yPos;
                 
                 $('#debuginfo').html(text);
                 
             }

             , start: function() {

                 origPause = isPaused;
                 isPaused = true;
                 setAlign($('#targettext'), 'left');
                 
                 startX = $(this).offset().left;

                 var origWidth = parseInt($(this).css('width'), 10);
                 $('#finalX').text('origWidth: ' + origWidth);
                 $('#finalY').text('startX: ' + startX);
                 
             }
             
             , stop: function(){
                 
                 var finalOffset = $(this).offset();
                 
                 var finalX = finalOffset.left;
                 var finalY = finalOffset.top;

                 var compare = finalX - startX;

                 var align = $('#targettext').css('text-align');
                 var ltr = (compare > 0) && (align != 'right'); // if we moved to right, it's positive. left, it's negative.
                 
                 // not quite right. OR, the original calculation is incorrect....
                 var origWidth = parseInt($(this).css('width'), 10);
                 
                 
                 // conceptually, this is... almost there?
                 // I think the biggest problem is grabbing what you think is one side
                 // but the alignment is on the opposite side.... blargh
                 var newWidth;
                 if (ltr) {
                     newWidth = origWidth - (2 * finalX);
                 } else {
                     // we visibly moved to the left, while on right-alignment
                     // this translates into a move right, plus shrink width.
                     // we need to ERASE the move to the left...
                     // TODO: ah-ha! we can't actually set in this manner...
                     // $(this).offset().left = -$(this).offset().left;  // $(this).offset().right;
                     $(this).css('left', startX + finalX);
                     newWidth = origWidth + finalX;
                 };
                 
                 
                 $(this).css('width', newWidth);
                 $('#finalX').text('origWidth: ' + origWidth);
                 $('#finalY').text('newWidth: ' + newWidth);

                 isPaused = origPause;

             }

            });
    });

    var delay = 50;
    var blinky = setInterval(function() {
        if(!isPaused) {
            swapper();
        }
    }, delay);
    
    $(document).bind('keydown', 'space', keyed );

    
    // // fade out the info box, then pulse the "mustshow" text(s)
    // // five seconds seems reasonable
    // // TODO: do we want to set/check a cookie to not display after the first few times?
        // $('#infobox').fadeOut(5000, function() { $('#mustshow').effect('pulsate', { times: 3 }, 2000); });
    $('#infobox').fadeOut(5000);
    
});


var keyed = function() {

    isPaused = !isPaused;
    
};


var swapper = function() {

    var align = $('#targettext').css('text-align');

    align = (align == 'right' ? 'left' : 'right');
    setAlign($('#targettext'), align);
    
};

var setAlign = function(target, align) {

    target.css('text-align', align);
    
};



// found @ http://blog.roberthallam.org/2011/06/sort-a-list-using-query/
var sortbylength = function($elements) {
    
    var listitems = $elements.children('li').get();

    listitems.sort(function(a, b) {
        var compA = a.innerHTML.length;
        var compB = b.innerHTML.length;
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    
    $.each(listitems, function(idx, itm) { $elements.append(itm); });
    
};

// TODO: would be nice to be able to select some color "schemes" or families....
// TODO: test these ranges sometime
var recolorAndShow = function(items) {

    var width = $('#text-wrap').width();

    $.each(items, function () {
        
        var textColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';
            
        var backgroundColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';


        
        $(this).css({  'color': textColor
                       // , 'background-color': backgroundColor
                       , 'display' : 'block'
                       , 'opacity' : '0.5'
                       , 'width'   : width
                    });
        
    });

};



