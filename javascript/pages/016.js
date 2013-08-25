$(document).ready(function() {

    page16();


});

// nothing is in #content (by default)
// cycle through #hidden
// take one span at a time
//   place into #content
//   maximize size
var page16 = function() {

    var speed = parseInt(SketchLib.GetOption('speed'), 10) || 400;
    var isPaused = false;
    var texts = $('#holding span');
    var current = 0; 
    var content = $('#content');
    
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

        content.html(texts[current]);
        
        current = (++current % texts.length);
        
        // https://github.com/michikono/boxfit
        content.boxfit({multiline: true, step_limit: 1000});

    };

    // http://stackoverflow.com/questions/246193/how-do-i-round-a-number-in-javascript
    var roundNumber = function(number, digits) {
        var multiple = Math.pow(10, digits);
        var rndedNum = Math.round(number * multiple) / multiple;
        return rndedNum;
    };
 
    var setContentSize = function() {
        // boxfit requires a absolutely set size
        var h = $(window).height();
        var w = $(window).width();
        content.css({ height: h, width: w });
        SketchLib.Log('content resized - width: ' + w + ' height: ' + h);
    };

    setContentSize();
    $(window).resize(setContentSize);
    var flasher = setInterval(displayNext, speed);

    $(document).bind('keydown', 'space', keyed );

    $('#infobox').fadeOut(5000);

    
};

