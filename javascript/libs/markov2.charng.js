
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

    var inputString = opts.inputString;
    var arrayLength = inputString.length;
    var outputString = "";
    var priorSubstring = " ";
    var toAdd = "";

    // parameter: n-gram size
    var ngramLength =  parseInt(opts.ngramLength, 10);


    // if doing Markov chaining,
    // find the first prior substring (i.e. what you'll use to find the next character)
    // find a random index, then find the next index at which the prior substring(a space) occurs
    if ( opts.model == "markov" ) {

        // from this point on, "ngramLength" actually describes the length of the substring
        ngramLength--;

        var randomIndex = Math.floor(Math.random()*arrayLength);
        var nextIndex = inputString.indexOf(priorSubstring, randomIndex);

        if ( nextIndex != -1 && nextIndex > ngramLength ) {
            priorSubstring = inputString.substring(nextIndex-ngramLength+1, nextIndex+1);
        }

    }

    // retrieve n chars, where n := ngramLength
    // this relies on all variables of parent scope being available internally
    var getNext = function() {

        // get a random index
        var randomIndex = Math.floor(Math.random()*arrayLength);

        // starting from random index, look for next instance that has the prior substring
        // foundAtEnd is used to see if the substring is found
        var foundAtEnd = inputString.indexOf(priorSubstring, randomIndex);

        // if you haven't found the substring between the random index
        // and the end of the corpus, then look from beginning
        // (this will always work, but may get the text segment that priorSubstring was last built on)
        if ( foundAtEnd == -1 ) {
            foundAtEnd = inputString.indexOf(priorSubstring, 0);
        }
        var nextIndex;
        // nextIndex is used to identify the string to use
        if ( opts.model == "markov" ) {

            // TODO: there's a bug here...
            nextIndex = foundAtEnd + ngramLength;
            //nextIndex = foundAtEnd + priorSubstring.length;

        } else if ( opts.model == "1-char overlap" ) {
            nextIndex = foundAtEnd + 1;
        }

        // if you're using "cento" chaining, then just paste the substring after this
        // else do the following
        if ( opts.model == "cento" ) {
            toAdd = inputString.substring(randomIndex, randomIndex + ngramLength);
        }

        // if you DID find the substring between the random index
        // and the end of the corpus, (or if you had to re-generate above)
        // then find the character to add and new prior substring
        if ( foundAtEnd != -1 ) {

            if ( opts.model == "markov" ) {

                // we're going to add the character at the next index
                toAdd =  inputString.charAt(nextIndex);

                // handle case if the next index is at the beginning of the text (ex: nextIndex is character 2, but ngram length is 4)
                if ( nextIndex > ngramLength ) {
                    priorSubstring = inputString.substring(nextIndex - ngramLength + 1, nextIndex + 1);
                } else {
                    priorSubstring = inputString.charAt(nextIndex);
                }
                
            } else if ( opts.model == "1-char overlap" ) {
                toAdd =  inputString.substring(nextIndex, nextIndex + ngramLength);

                priorSubstring = inputString.charAt(nextIndex + ngramLength - 1);
            }

            // this SHOULD never occur.  TO DO: remove?
        } else {

            toAdd =  "";
        }

        return toAdd;

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
        
        if (opts.model != 'markov') {
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
                if ( c == ' ') {
                    found = true;
                } else {
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
        for (var i = 0; i < n; i++) {

            var word = (opts.model == 'markov' ? getNextWord() : getNext() );
            ws.push(word);
            
        }

        if (opts.model != 'markov') {
            var s = ws.join('');
            ws = s.split(' ');
        }
        
        return ws;
        
    };


    return { GetNchars : getnchars,
             Next      : getNextWord,
             GetWords  : getWords
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
