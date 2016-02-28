"use strict";
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');
function tutorials() {
    console.log("List of tutorial packages in this directory...\n");
    console.log(chalk.yellow('This feature is not yet implemented'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tutorials;
function fileExists(path) {
    try {
        fs.accessSync(path, fs.R_OK | fs.W_OK);
    }
    catch (e) {
        if (e) {
            console.log(e);
            return false;
        }
    }
    return true;
}
function loadRootPackageJson() {
    var pathToPackageJson = path.join(process.cwd(), './package.json');
    if (fileExists(pathToPackageJson)) {
        return JSON.parse(fs.readFileSync(pathToPackageJson, 'utf8'));
    }
    else {
        console.log('no package.json file available. Try typing "npm init" in terminal');
        process.exit(1);
    }
}
function isTutorial(name) {
    var pathToTutorialPackageJson = path.join(process.cwd(), 'node_modules', name, 'package.json');
    if (fileExists(pathToTutorialPackageJson)) {
        var packageJson = JSON.parse(fs.readFileSync(pathToTutorialPackageJson, 'utf8'));
        if (packageJson.main && packageJson.main.match(/coderoad.json$/)) {
            var pathToCoderoadJson = path.join(process.cwd(), 'node_modules', name, packageJson.main);
            if (fileExists(pathToCoderoadJson)) {
                return true;
            }
        }
    }
    return false;
}
function searchForTutorials(location) {
    if (!!location) {
        return Object.keys(location)
            .filter(function (name) { return isTutorial(name); });
    }
    else {
        return [];
    }
}
function getTutorials() {
    var packageJson = loadRootPackageJson();
    var tutorials = []
        .concat(searchForTutorials(packageJson.dependencies))
        .concat(searchForTutorials(packageJson.devDependencies));
    if (tutorials.length) {
        console.log('Available tutorials: ');
        tutorials.forEach(function (tutorial) {
            console.log('  - ' + tutorial);
        });
    }
    console.log('No tutorials available');
}
