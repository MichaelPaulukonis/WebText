$(document).ready(function() {

    page17();

});

// nothing is in #content (by default)
// cycle through #hidden
// take one span at a time
//   place into #content
//   maximize size
var page17 = function() {
    
    var content = $('#content');
    var input;

    var etype = SketchLib.GetOption('engine') || 'markov'; // TODO: make sure is a valid engine
    var ngram = parseInt(SketchLib.GetOption('ngram'), 10) || 5;
    var c = SketchLib.GetOption('content') || 'raw';

    var testinput = "as an apple is to a beta, this bridge is over the any hill. who says? she says! so says the soothsayer rapunzel. As Brad the Bard and Ken knew, the can-can can not know how to do it like an apple, like a bridge, like a beast of burden with a heavy load. And so what? The bald bearded bard sings a braided tale of happiness, of woe, of bitter embargoed apples on a barge passing under a bridegroom's bridge by a tepid, vapid moon. His beer is here, and all ale is well, hale, and hearty. This is not my bridge, it is your bridge, your toll bridge, your tool for trolls and travellers. I see you singing, Bradley Bard, I hear you. Your embalmer blames the bridge, his badge is barely adequate for the aqueduct, he ducks his dock responsibilities badly, baldly. Who is the third that walks beside you? How is he known, and how can he see in the dark (if, in fact, he can.) All what? All right, that is okay, he said.";
    
    switch(c) {
        case 'raw':
        case 1:
        input = $('#raw').html();
        break;

        case 'material':
        case 2:
        input = $('#material').html();
        break;

        case 'test':
        case 3:
        default:
        input = testinput;
        break;

    }

    
    var keyed = function() {

        isPaused = !isPaused;
        
    };


    
    var getEngine = function(input, etype, ngram) {

        var opts = {};

        // TODO: this should be part of the library
        // EXCEPT.... it's not a static object, so it's not availbe yet.....
        var markovModels = { markov: "markov",
                             cento: "cento",
                             overlap: "1-char overlap"
                           };
        
        opts.inputString = input; 

        opts.model = etype;

        // this is a char-based engine
        opts.ngramLength = ngram;

        var w = new markov(opts);
        
        return w;
        
    };

    var randomChunks = function(words) {

        var chunks = [];

        // range: Math.floor(Math.random() * (max - min + 1)) + min;

        var tot = 0; // words.length;

        while (tot < words.length) {
            var grab = Math.floor(Math.random() * 10) + 1; // grab 1...10 words
            // if random > length of array, only grab what is remaining
            if (tot + grab > words.length) {
                grab = words.length - tot;
            }
            var bite = words.slice(tot, tot + grab);
            tot += grab;
            chunks.push(bite.join(' '));
        }
        
        return chunks;
        
    };

    var generate = function() {
        
        var e = getEngine(input, etype, ngram);
            
        var words = e.GetWords(1000);
        var bites = randomChunks(words);    
        // content.html('<p>' + bites.join('</p>\n<p>') + '</p>');
        content.html('<span>' + bites.join('</span>\n<span>') + '</span>');

    };

    generate();

    $(document).bind('keydown', 'r', generate );

    $('#infobox').fadeOut(5000);

    
};

