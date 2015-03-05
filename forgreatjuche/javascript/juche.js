/**

 select a random soound-effect from don-martin list
 https://raw.github.com/cjwinchester/cjwinchester.github.io/master/sandbox/martin/martin.js
 google-search for an image
 show it plus the sound effect
 PROFIT!!!

 **/

console.log('loading google image search....');
google.load('search', '1');

var imageSearch, mart,
    fullsize = { 'min-width': '', 'min-height': '' };

// generates a random number
var random = function(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
};

// ugh, using mart as a global, not a param
var searchComplete = function() {

    if (imageSearch.results && imageSearch.results.length > 0) {

        var samp = (_.sample(imageSearch.results));
        var url = samp.url;
        var img = $('#soundimage');
            // descr = mart.description + ' - ' + mart.issue + ', ' + mart.date;
        img.attr('src', url);
        // img.attr('title', mart.description + ' - ' + mart.issue + ', ' + mart.date);
        img.error(function(url) {
            console.log('error loading: ' + url);
            launchSearch();
        });

        img.on("load", function() {
            console.log('image loaded');
            if (img[0].naturalHeight === 0 || img[0].naturalWidth === 0) {
                console.log('image: ' + img[0].src + ' failed to load.');
                launchSearch();
                return;
            }
            img.css(fullsize); // reset size if previously shrunk by user
            $('#content').fadeIn();
            $('#sound').text(mart);
            $('.description').text(mart);
            img.click(function(e){
                var img = $(this),  width = img.css('min-width'), newsize = {};
                if (width !== '0px') {
                    newsize = {'min-width': '0px',
                               'min-height': '0px'};
                } else {
                    newsize = fullsize;
                }
                img.css(newsize);
                e.stopImmediatePropagation();
            });

        });

    }

};

var launchSearch = function() {

    $('#content').fadeOut();
    imageSearch = new google.search.ImageSearch();
    imageSearch.setResultSetSize(10); // defaults to 4 -- let's get some more variation
    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

    // can't execute imageSearch until launchSearch has completed.
    mart = _.sample(slogans);

    // get gifs 1/5 of the time
    // maybe they'll be animated...
    if (random(10) <= 8) {
        imageSearch.setRestriction(
            google.search.ImageSearch.RESTRICT_FILETYPE,
            google.search.ImageSearch.FILETYPE_GIF,
            google.search.ImageSearch.ANIMATED
        );
        // mart += ' north korea animated -twitter';
    }
    // prefer red photos 1/3 of the time...
    if (random(10) <= 3) {
        imageSearch.setRestriction(
            google.search.ImageSearch.RESTRICT_COLORFILTER,
            google.search.ImageSearch.COLOR_RED
        );
    }

    imageSearch.setRestriction(
        google.search.ImageSearch.RESTRICT_IMAGESIZE,
        google.search.ImageSearch.IMAGESIZE_MEDIUM
    );

    // console.log('slogan: ' + mart);
    // imageSearch.execute(mart + ' North Korea -twitter -tweet');
    var searchTerm = _.sample(searchTerms) + ' ' + _.sample(searchTerms);
    console.log('search term: ' + searchTerm);
    imageSearch.execute(searchTerm);
};

google.setOnLoadCallback(launchSearch);


$(document).bind('keydown', 'space', launchSearch );


// preliminary hide/show code for "new" info-box at bottom of page
var infoDisappear = function($this) {
    $this.stop().animate({bottom: infoBottom, opacity: 0.01}, 'slow');
    console.log('disappeared');
};

var infoAppear = function($this) {
    $this.stop().animate({bottom: 0, opacity: 0.75}, 'slow');
    console.log('appeared');
};

var $info = $('#info'),
    infoBottom = $info.css('bottom');
$info.mouseenter(function() { infoAppear($info); }).mouseleave(function() { infoDisappear($info); });

infoAppear($info);
$info.fadeTo(10000, 0.01);


// };
