// some node twiddling on the path towards a javascript utility
// http://cs.brown.edu/courses/csci1320/labs/node_lab.html

var fs = require('fs'),
    path = require('path'),
    colors = require('colors');

fs.readFile(__filename, function(err, data) {
    console.log('the contents of', path.basename(__filename).cyan, 'is:\n');
    console.log(data.toString('utf8').red);
});