"use strict";
var fs = require('fs');
var path = require('path');
var file_1 = require('../tools/file');
function createTutorialMd() {
    if (!file_1.fileExists('tutorial.md')) {
        console.log('adding tutorial md');
        var inputPath = path.join(__dirname, './setup/tutorial.md');
        var tutorial = fs.readFileSync(inputPath, 'utf8');
        fs.writeFileSync('tutorial.md', tutorial, 'utf8');
    }
}
exports.createTutorialMd = createTutorialMd;
function createPackageJson(name) {
    if (!file_1.fileExists('package.json')) {
        var inputPath = path.join(__dirname, './setup/package.json');
        var packageJson = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
        packageJson.name = 'coderoad-' + name;
        var packageJsonString = JSON.stringify(packageJson, null, 2);
        fs.writeFileSync('package.json', packageJsonString, 'utf8');
    }
}
exports.createPackageJson = createPackageJson;
function createTestFiles() {
    if (!file_1.fileExists('./test')) {
        fs.mkdirSync('./test');
    }
    if (!file_1.fileExists('./test/test-example-01.spec.js')) {
        var inputPath = path.join(__dirname, './setup/test/test-example-01.spec.js');
        var test = fs.readFileSync(inputPath, 'utf8');
        fs.writeFileSync('./test/test-example-01.spec.js', test, 'utf8');
    }
}
exports.createTestFiles = createTestFiles;
