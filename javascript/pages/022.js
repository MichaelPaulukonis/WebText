// // Don Martin SFX
// $(document).ready(function() {

//     page22();

// });

// var page22 = function() {

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


var searchComplete = function() {

    if (imageSearch.results && imageSearch.results.length > 0) {

        var samp = (_.sample(imageSearch.results));
        var url = samp.url;
        var img = $('#soundimage'),
            descr = mart.description + ' - ' + mart.issue + ', ' + mart.date;
        img.attr('src', url);
        img.attr('title', mart.description + ' - ' + mart.issue + ', ' + mart.date);
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
            $('#sound').text(mart.sound);
            $('.description').text(descr);
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
    mart = _.sample(don_martin);
    imageSearch.execute(mart.description);
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
