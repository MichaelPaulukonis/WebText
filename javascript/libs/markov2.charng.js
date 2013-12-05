
// var generate = function() {

//     var opts = {};

//     var markovModels = { markov: "markov",
//                          cento: "cento",
//                          overlap: "1-char overlap"
//                        };

//     opts.inputString = "input string";

//     opts.model = markovModels.markov;

//     // this is a char-based engine
//     opts.ngramLength =  5;

//     var w = new markov(opts);

//     return w;

// };

var markov = function(opts) {

    var models = { markov: "markov",
                   cento: "cento",
                   overlap: "1-char overlap"
                 };

    var setModel = function(model) {
        // TODO: confirm that model is valid
        opts.model = model;
    };

    var setNGram = function(n) {
        opts.ngramLength = parseInt(n, 10);
    };

    var setGovernor = function(n) {
        opts.repetitionGovernor = n;
    };

    // TODO: should we always read the opts object, or read a local var?!??
    // specifically - opts.inputString ... hrm.....
    var inputString = opts.inputString || 'NO TEXT PROVIDED'; // default to a text, as we get infinite loops otherwise (TODO: fix that)

    opts.repetitionGovernor = opts.repetitionGovernor || 10;

    var repeatChars = [];
    var repeatWords = [];

    var outputString = "";
    var _priorSubstring = " ";
    var toAdd = "";

    // parameter: n-gram size
    var ngramLength =  parseInt(opts.ngramLength, 10) || 5; // default to 5


    // TODO: I had some idea of recording the sequnce of random indexes
    // and allowing them to be "played back"
    // to test algorithm changes
    // we could replace getRandomIndex with an iterator over a specified set
    var getRandomIndex = function() {
        return Math.floor(Math.random()*inputString.length);
    };


    // TODO: if the model is CHANGED to markov
    // does this initialization need to be run?
    // if doing Markov chaining,
    // find the first prior substring (i.e. what you'll use to find the next character)
    // find a random index, then find the next index at which the prior substring(a space) occurs
    var setPriorSubstring = function() {
        if ( opts.model == models.markov ) {

            // from this point on, "ngramLength" actually describes the length of the substring
            ngramLength--;

            var randomIndex = getRandomIndex();
            var nextIndex = inputString.indexOf(_priorSubstring, randomIndex);

            if ( nextIndex != -1 && nextIndex > ngramLength ) {
                _priorSubstring = inputString.substring(nextIndex-ngramLength+1, nextIndex+1);
            }

        }
    }();

    var getNext = function() {

        var gn = getNextInner();

        // TODO: the repetitionGovernor model gets hung up sometimes. FIX.
        // var r = storeRepeat(gn);
        // if (r.length > opts.repetitionGovernor) {
        //     // need to redo it
        //     // will this EVER take place for non-Markov models?
        //     // porbbaly not for non-pervest cento-scenarios
        //     // unsure about overlap
        //     // in any case, traps should be made for those as well
        //     if (opts.model == models.markov) {
        //         setPriorSubstring();
        //     }
        // }

        return gn;

    };

    // retrieve n chars, where n := ngramLength
    // this relies on all variables of parent scope being available internally
    var getNextInner = function() {

            // get a random index
        var randomIndex = getRandomIndex();

            // starting from random index, look for next instance that has the prior substring
        // foundAtEnd is used to see if the substring is found
        var foundAtEnd = inputString.indexOf(_priorSubstring, randomIndex);

        // if you haven't found the substring between the random index
        // and the end of the corpus, then look from beginning
        // (this will always work, but may get the text segment that _priorSubstring was last built on)
        if ( foundAtEnd == -1 ) {
            foundAtEnd = inputString.indexOf(_priorSubstring, 0);
        }
        var nextIndex;
        // nextIndex is used to identify the string to use
            if ( opts.model == models.markov ) {

                // TODO: there's a bug here...
                nextIndex = foundAtEnd + ngramLength;
                //nextIndex = foundAtEnd + _priorSubstring.length;

            } else if ( opts.model == models.overlap ) {
                nextIndex = foundAtEnd + 1;
            }

        // if you're using "cento" chaining, then just paste the substring after this
        // else do the following
        if ( opts.model == models.cento ) {
            toAdd = inputString.substring(randomIndex, randomIndex + ngramLength);
        }

        // if you DID find the substring between the random index
        // and the end of the corpus, (or if you had to re-generate above)
        // then find the character to add and new prior substring
        if ( foundAtEnd != -1 ) {

            if ( opts.model == models.markov ) {

                // we're going to add the character at the next index
                toAdd =  inputString.charAt(nextIndex);

                // handle case if the next index is at the beginning of the text (ex: nextIndex is character 2, but ngram length is 4)
                if ( nextIndex > ngramLength ) {
                    _priorSubstring = inputString.substring(nextIndex - ngramLength + 1, nextIndex + 1);
                } else {
                    _priorSubstring = inputString.charAt(nextIndex);
                }

            } else if ( opts.model == models.overlap ) {
                toAdd =  inputString.substring(nextIndex, nextIndex + ngramLength);

                _priorSubstring = inputString.charAt(nextIndex + ngramLength - 1);
            }

            // this SHOULD never occur.  TO DO: remove?
        } else {

            toAdd =  "";
        }

        return toAdd;

    };

    // store most recent addition
    // depending on model, pick the right storage unit
    // if a new addition, purge the storage
    var storeRepeat = function(s) {

        var r = [];

        if (opts.model == models.markov) {
            r = repeatChars;
        } else {
            r = repeatWords;
        }

        if (r[r.length-1] != s) {
            r = [];
        }

        r.push(s);

        return r;

    };


    var getnchars = function(n) {

        var output = '';

        while ( output.length <= n ) {
            // TODO: 1-char overlap returns more than one char at a time?!??!
            output += getNext();
        }

        return output;
    };

    // simply defined as a white-space char
    // which is part of the word still.
    var getNextWord = function() {

        var word = '';

        if (opts.model != models.markov) {
            word = getNext();
        } else {
            // this is not a good model for non-markov words
            // if it is returning one char, yeah
            // but it is NOT returning one char at a time
            // so: ugh
            // whitespace can be in the middle of the return value
            // or even contain multiple small words
            // but here, every piece is treated as one word
            // and exterior algorithms will surround with space
            // which is not so good
            // since the "cento" method is ALWAYS random, and doesn't rely on previous input
            // we can grab a bunch of text, count number of whitespaces, and return the correct amount
            // (this is a rough algorithm, and not optimised)
            // one-char overlap is a bit different, though
            // we don't want to discard pieces
            // since those could be used on a futher call
            // you know, ANOTHER "get Next word"
            // oh. which means that the cento method should not be HERE, but elsewhere
            // and probably "cento" doesn't have a "next word" model at all.
            // it can have "next" but not word.
            var found = false;
            while (!found) {
                var c = getNext();
                // there is a small bug that pops up here sometimes
                // if ' ' is the first returned characters, then word.length == 0
                // a space can lead to another space, leading to an infinite loop
                // we need a repetition governor in here.....
                if ( c == ' ' & word.length > 0) {
                    found = true;
                } else if (c!= ' ') {
                    word += c;
                }
            }
        }

        return word;

    };

    // if model is NOT markov
    // concat as string
    // split on spaces
    var getWords = function(n) {

        var ws = [];

        // if model != markov
        // then n is imprecise
        // and probably way too small
        // quick, non-scientific tests
        // show we're only getting about 75% of the desired result


        if (opts.model != models.markov) {
            var wc = 0;
            var cw = '';
            while (wc < 1000) {
                var word = getNext();
                cw += word;
                wc = cw.split(' ').length; // to obtain the count of all spaces. s/b a better method....
            }
            ws = cw.split(' ');
        } else {
            for (var i = 0; i < n; i++) {
                var word = getNextWord();
                ws.push(word);
            }
        }

        return ws;

    };


    return { GetNchars : getnchars,
             Next      : getNextWord,
             GetWords  : getWords,
             Models    : models,
             Text      : inputString
           };

};


// TO DO: make sure we're not at the beginning or end of the string
function getCharacterInContext( aString, anIndex ) {

    var tempString = "";
    var returnString = "";

    // TODO: why 8 ???
    tempString = aString.substring(anIndex-8, anIndex);
    returnString += replaceNewlines(tempString);

    returnString += "|" + replaceNewlines( aString.charAt(anIndex) ) + "|";

    // why 9 ???
        tempString = aString.substring(anIndex+1, anIndex+9);
    returnString += replaceNewlines(tempString);
    returnString += "\n";

    return returnString;
}


function replaceNewlines( aString ) {

    return aString.replace(/[\n\r]/g, "\\n");
}
