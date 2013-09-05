/*
  jakefile.js for webtext

*/

var path = require('path');
var fs = require('fs');
var config = require('./config');

desc('This is a simple complete-project copy.');
task('default', [], function () {
    push(config.target[loc1]);
});


desc('Push the project (no ignore) to the config location passed in..');
task('push', [], function (location) {
    console.log(location);
    if (config.target[location] == undefined) {
        console.error(location + ' is not a valid location. Try one of the following:');
        console.log(config.target);
        return;
    }
    // console.log(config.target[location]);
    push(config.target[location]);
});



var push = function(target) {
    // TODO: this is more complicated
    // we want to ignore things. or only hit certain things. :::sigh:::
    jake.mkdirP(target);
    jake.cpR("./", target);
};

var getProjectFiles = function() {

    var list = new jake.FileList();

    list.include('*.html');
    list.include('css/libs/*.css');
    list.include('css/pages/*.css');
    list.include('javascript/libs/*.js');
    list.include('javascript/pages/*.js');

    return list;
}


var getDateFormatted = function() {
    var d = new Date();
    var df = d.getFullYear() + '.' + pad((d.getMonth() + 1), 2) + '.' + pad(d.getDate(), 2);
    return df;
};

function pad(nbr, width, fill) {
    fill = fill || '0';
    nbr = nbr + '';
    return nbr.length >= width ? n : new Array(width - nbr.length + 1).join(fill) + nbr;
}


desc('List the config elements');
task('dump', [], function() {
    console.log(config);
    console.log('date: ' + getDateFormatted());
    console.log('included files: \n' + getProjectFiles().toArray().join('\n'));
});


// does not appear to be working...
desc('Zip up the project.');
task('zip', [], function() {

    var name = 'webtext';

    var version = getDateFormatted();

    var t = new jake.PackageTask(name, version, function() {

        // this.packageFiles.items = getProjectFiles();
        var files = [ 'd:/temp/WebText/001.html', 'd:/temp/WebText/002.html'];
        this.packageFiles.items = files;

        console.log(this.packageFiles.items);

        this.needZip = true;

    });

});
