$(document).ready(function() {

    // in the distant past, the code was based on 3D flying text
    //    http://www.devirtuoso.com/2009/08/3d-flying-text-in-jquery/
    // this is a far-removed variant that positions the text around the screen, but does not animate.
    // SINCE FIREFOX ANIMATION WAS SLOW. Waaaah!

    $('li').css('display', 'none');

    // randomize all elems [execpt mustshow], get 25 [thus, a random selection], and then include the page's mustshow
    // this ensures that mustshow will appear once and only once
    // assuming it's not invisible or something. that happens.
    var items = $('li').not('#mustshow').get().sort(function(){
        return Math.round(Math.random())-0.5;
    }).slice(0,30).concat($('#mustshow'));

    reposition(items);
    recolor(items);
    $.each(items, function() { $(this).draggable({cursor: "move", stack: 'li' }); });

    // fade out the info box, then pulse the "mustshow" text(s)
    // five seconds seems reasonable
    // TODO: do we want to set/check a cookie to not display after the first few times?
    $('#infobox').fadeOut(5000, function() { $('#mustshow').effect('pulsate', { times: 3 }, 2000); });
    
});

// Reposition the items
function reposition(items) {

    var winWidth = $(document).width();
    var winHeight = $(document).height();

    //alert('width: ' + winWidth + ' height: ' + winHeight);
    
    //Step through each item.
    for(var i = items.length - 1; i >= 0; --i){

        // range: Math.floor(Math.random() * (max - min + 1)) + min;
        
        var maxWidth = Math.floor(Math.random() * (winWidth/2 - 100)) + 100;

        var xVar = Math.floor((Math.random() * (winWidth - ( maxWidth))));    // + (0.5 * maxWidth);            // x value
        var yVar = Math.floor((Math.random() * winHeight - 100));            // y value, but is sometimes off-screen...

        // size (and opacity will be a function of size)
        var zVar = Math.floor((Math.random() * 450)) + 50;         // z value, text get larger.
        
        $(items[i]).css({
              position: 'absolute'
            , display: 'block'
            , left: xVar + 'px'
            , top: yVar + 'px'
            , 'font-size': zVar + '%'
            , opacity: (zVar)/600 + 0.1
            , 'max-width': maxWidth
        });
        
    }

}

// TODO: would be nice to be able to select some color "schemes" or families....
// TODO: test these ranges sometime
var recolor = function(items) {
    
    $.each(items, function () {
        
        var textColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';
        
        var backgroundColor = 'rgb(' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) )
            + ',' + (Math.floor((256)*Math.random()) ) + ')';
        
        $(this).css({'color': textColor, 'background-color': backgroundColor});
        
    });

};



