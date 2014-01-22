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

        var url = (_.sample(imageSearch.results)).url;
        var img = $('#soundimage');
        img.attr('src', url);
        img.attr('title', mart.description);

        img.load(function() {
            img.css(fullsize); // reset size if previously shrunk by user
            $('#content').fadeIn();
            $('#description')[0].innerHTML = mart.sound;
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

var onLoad = function() {

    $('#content').fadeOut();
    imageSearch = new google.search.ImageSearch();
    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

    // can't execute imageSearch until onLoad has completed.
    mart = _.sample(don_martin);
    imageSearch.execute(mart.description);
};

google.setOnLoadCallback(onLoad);


$(document).bind('keydown', 'space', onLoad );

// $('#infobox').fadeOut(5000);

// };
