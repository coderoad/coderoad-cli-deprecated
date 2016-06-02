"use strict";
var path_1 = require('path');
var fs_1 = require('fs');
var node_file_exists_1 = require('node-file-exists');
exports.tutorialError = 'This is an error with the tutorial itself';
function isTutorial(dir, name) {
    var pathToTutorialPackageJson = path_1.join(dir, 'node_modules', name, 'package.json');
    if (!node_file_exists_1.default(pathToTutorialPackageJson)) {
        console.log("Error with " + name + ": no package.json file found. " + exports.tutorialError);
        return false;
    }
    var pj = JSON.parse(fs_1.readFileSync(pathToTutorialPackageJson, 'utf8'));
    if (!pj.hasOwnProperty('main') || !pj.main.match(/coderoad.json$/)) {
        return false;
    }
    var pathToCoderoadJson = path_1.join(dir, 'node_modules', name, pj.main);
    if (!node_file_exists_1.default(pathToCoderoadJson)) {
        console.log("Error with " + name + ": no coderoad.json file. " + exports.tutorialError);
        return false;
    }
    ;
    if (!pj.config || !pj.config.runner) {
        console.log("Error with " + name + ": no test runner specified. " + exports.tutorialError);
        return false;
    }
    return true;
}
exports.isTutorial = isTutorial;
