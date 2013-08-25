
var generate = function() {

    var opts = {};

    var markovModels = { markov: "markov",
                         cento: "cento",
                         overlap: "1-char overlap"
                         };
    
    opts.inputString = "input string";

    opts.model = markovModels.markov;

    // this is a char-based engine
    opts.ngramLength =  5;
    opts.numberOfChars = 500;

    var w = writeNGram(opts);

    return w;
    
};

function writeNGram(opts) {

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

    // TODO: 'twould be nice to be able to expose all of this as engine.next
    // which would give us the next "word" (as defined to be until the next whitespace character occurs)
    // alternative, to retreive n characters - without (re)providing input
    // repeatably
    
    // and not have to supply input and retrieve a set # of chars, and THEN start over...

    // so we will need an initial state
    // a method to just ret

    // I _think_ that all of the below can be put into a method to retrieve n chars
    //   where n := ngramLength

    
    // generate the characters
    for ( var x = 1; x <= opts.numberOfChars; x++) {

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
            x += ngramLength-1;
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
                toAdd =  inputString.substring(nextIndex,nextIndex + ngramLength);

                priorSubstring = inputString.charAt(nextIndex + ngramLength - 1);
                x += ngramLength-1;
            }

            // this SHOULD never occur.  TO DO: remove?
        } else {

	    toAdd =  "";
        }

        outputString += toAdd;

    }

    return outputString;
    
}


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
