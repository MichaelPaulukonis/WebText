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


desc('List the config elements');
task('dump', [], function() {
    console.log(config);
    console.log('date: ' + getDateFormatted());
    console.log('included files: \n' + getProjectFiles().toArray().join('\n'));
});




desc('Push the project (no ignore) to the config location passed in..');
task('push', [], function (location) {
    console.log(location);
    if (config.target[location] == undefined) {
        console.error(location + ' is not a valid location. Try one of the following:');
        console.log(config.target);
        return;
    }
    console.log(config.target[location]);
    push(config.target[location], getProjectFiles());
});



// TODO:
// delete temp if already exists
// create temp folder
// copy included files to temp
// zip temp
// allow temp folder to remain
desc('Zip up the project.');
task('zip', [], function() {

    var name = 'webtext';

    var version = getDateFormatted();

    var AdmZip = require('adm-zip');
    var zip = new AdmZip();


    var addFile = function(file) {

        var path = file.substring(0, file.lastIndexOf('\\') + 1);

        // console.log('path: ' + path + ' file: ' + file);
        console.log('addLocalFile(' + file + ', ' + path + ');');

        zip.addLocalFile(file, path);

    };

    // as it stands, everything is added, hooray!
    // only in a flat structure, no sub-folders. boo.
    // getProjectFiles().toArray().map(function(file) { zip.addLocalFile(file);});

    getProjectFiles().toArray().map(addFile);

    zip.writeZip(name + '.' + version + '.zip');


    // isn't working. not sure what I'm doing wrong
    // var t = new jake.PackageTask(name, version, function() {

    //     // this.packageFiles.items = getProjectFiles();
    //     var files = [ 'd:/temp/WebText/001.html', 'd:/temp/WebText/002.html'];
    //     this.packageFiles.items = files;

    //     console.log(this.packageFiles.items);

    //     this.needZip = true;

    // });

});


// takes a location and a jake FileList object
var push = function(target, jakefilelist) {

    var moveFile = function(file) {
        var p = file.substring(0, file.lastIndexOf('\\') + 1);
        var tp = path.join(target, p);
        console.log('file: ' + file + ' target: ' + tp);
        debugger;
        jake.mkdirP(tp); // any given file can have a new path. so. Inefficient?
        jake.cpR(file, tp);
    };

    jakefilelist.toArray().map(moveFile);

};

var getProjectFiles = function() {

    var list = new jake.FileList();

    list.exclude(/.*bak.*/);

    list.include('*.html');
    list.include('./css/libs/*.css');
    list.include('./css/pages/*.css');
    list.include('./javascript/libs/*.js');
    list.include('./javascript/pages/*.js');

    // console.log(list);

    return list;
};


var getDateFormatted = function() {
    var d = new Date();
    var df = d.getFullYear() + '.' + pad((d.getMonth() + 1), 2) + '.' + pad(d.getDate(), 2);
    return df;
};

var pad = function(nbr, width, fill) {
    fill = fill || '0';
    nbr = nbr + '';
    return nbr.length >= width ? nbr : new Array(width - nbr.length + 1).join(fill) + nbr;
};

var tempname = function() {
    return "build"; // that will do for now....
};

