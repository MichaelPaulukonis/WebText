$(document).ready(function() {

    page15();
    
});

// text is black-on-black by default
// cycle through list (random order)
// changing current text to white, previous to black
var page15 = function() {

    var speed = parseInt(SketchLib.GetOption('speed'), 10) || 400;
    var isPaused = false;
    var texts = $('#content span');
    var current = 0; 

    
    var keyed = function() {

        isPaused = !isPaused;
        
    };

    var displayNext = function() {

        if (isPaused) { return; }        

        if (current == 0) {
            // randomize list
            // TODO: add this to the sketchlib.js library
            texts = texts.sort(function() {
                return Math.round(Math.random())-0.5;
            });
        }
        
        $(texts[current]).removeClass('active');
        current = (++current % texts.length);

        // hrm. we're never actually displaying the first element....
        $(texts[current]).addClass('active');
    };

    // http://stackoverflow.com/questions/246193/how-do-i-round-a-number-in-javascript
    var roundNumber = function(number, digits) {
        var multiple = Math.pow(10, digits);
        var rndedNum = Math.round(number * multiple) / multiple;
        return rndedNum;
    };
    
    // TODO: increase text size (or other params) until height of #content == window.height
    var maxSize = function() {
        
        // window.height()
        var wh = $(window).height();
        var ch = $('#content').height();
        var ratio = roundNumber(ch/wh, 4);
        var textSize = $('#content').css('font-size').replace('px', '');

        if (SketchLib.Debug) {
            var text = '<br /> window height:: ' + wh;
            text +=  '<br/> content height: ' + ch;
            text +=  '<br/> w/c ratio: ' + ratio;
            text +=  '<br/> text size: ' + textSize + 'px';
            
            $('#debuginfo').html(text);
        }
        
        // TODO: if ratio > 1, reduce size of content
        // if ratio < 1, increase size of content.....

        var newSize = textSize;
        if (ratio > 1) {
            newSize--;
        } else if (ratio < 1) {
            newSize++;
        }

        $('#content').css('font-size', newSize + 'px');
        
        
    };


    maxSize();
    
    var flasher = setInterval(displayNext, speed);

    $(document).bind('keydown', 'space', keyed );

    $('#infobox').fadeOut(5000);

    
};

