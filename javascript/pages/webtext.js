
var textTitle = "luxury, fragile, and opened";

var tl = new Array(
    "           The only thing",
    "left",
    "            are the shoes,",
    "    and the",
    "skeletal",
    "remains decalcified. The only thing left are the",
    "shoes, and only",
    "      their shoes,",
    "       strangely, remain. The",
    "British",
    "luxury",
    "liner Titanic glides through the Southampton, England, harbor",
    "to begin her",
    "            ill-fated",
    "maiden voyage.",
    "",
    "she had advanced safety features such",
    "             as watertight doors,",
    "      she had a powerful wireless telegraph provided",
    "for the currents.",
    "",
    "He'd seen something.",
    "  The sinking",
    "              of Titanic broke",
    " up and",
    "          luxury, fragile",
    "         and opened",
    "         five",
    "           of",
    "     cowardice",
    "   for 14 people.",
    "Public inquiries in",
    "                   Second Class were",
    "launched only their location, with",
    "over",
    "90%",
    "of their most famous ships in perfect shape. Titanic's",
    "talked to their money",
    "      and tar, each pair",
    "of artefacts have been recovered",
    "",
    "inky black with the wealthiest people."

);

var init = function() {

    speedNextLine = 1500;
    speedNextChar = 60;
    speedNextPerformance = 2 * 60 * 1000; // 2 minutes
    speed = {
        nextLine: 1500,
        nextChar: 60,
        nextPerformance: 2 * 60 * 1000
    };
    index = 0;
    text_pos = 0;
    lineLength = tl[0].length;
    
};

var speed;
var speedNextLine;
var speedNextChar;
var speedNextPerformance;
var index;
var text_pos;
var lineLength;
var contents;
var row;

// doh! will only work after OnDocumentReady
// that alone is enough reason to use jQuery ?!?!?
// in the meantime, it's inlined, in the html...
var title = document.getElementById('texttitle');
if (title) {
    title.innerHTML = textTitle;
}

init();

window.onload = function() {

    var bg = document.getElementById('background');
    if (bg) {
        bg.src = "./background_images/titanic_clip.gif";
        }

    typeText();
    
};

function typeText() {
    
    contents = '';
    // magic-number : =  number of rows to display...
    row = Math.max(0,index-30);
    while(row<index) {
        contents +=  tl[row++].replace(/ /gi, '&nbsp;') + '<br />';;
    }

    var target = document.getElementById('targettext');
    var linefrag = tl[index].substring(0,text_pos).replace(/ /gi, '&nbsp;');
    target.innerHTML =  contents + linefrag + "_";

    if (text_pos++ == lineLength)
    {
        text_pos = 0;
        index++;
        if (index != tl.length) {
            lineLength = tl[index].length;
            setTimeout(typeText, speedNextLine);
        } else {
            init();
            setTimeout(typeText, speedNextPerformance);
        }
    } else  {
        setTimeout(typeText,speedNextChar);
    }
};