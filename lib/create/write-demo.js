"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var file_1 = require('../tools/file');
function createFile(pathToFile) {
    if (!file_1.fileExists(pathToFile)) {
        var inputPath = path_1.join(__dirname, '..', '..', 'setup', pathToFile);
        var test = fs_1.readFileSync(inputPath, 'utf8');
        fs_1.writeFileSync(pathToFile, test, 'utf8');
    }
}
function createFolder(pathToFolder) {
    if (!file_1.fileExists(pathToFolder)) {
        fs_1.mkdirSync(pathToFolder);
    }
}
function createTutorialMd() {
    createFolder('tutorial');
    createFile(path_1.join('tutorial', 'tutorial.md'));
    createFolder(path_1.join('tutorial', '1'));
    createFolder(path_1.join('tutorial', '1', '01'));
    createFile(path_1.join('tutorial', '1', '01', 'page-one.md'));
    createFolder(path_1.join('tutorial', '1', '02'));
    createFile(path_1.join('tutorial', '1', '02', 'page-two.md'));
    createFolder(path_1.join('tutorial', 'common'));
    createFile(path_1.join('tutorial', 'common', 'loadJS.js'));
}
exports.createTutorialMd = createTutorialMd;
function createPackageJson(name) {
    if (!file_1.fileExists('package.json')) {
        var inputPath = path_1.join(__dirname, '..', '..', 'setup', 'package.json');
        var packageJson = JSON.parse(fs_1.readFileSync(inputPath, 'utf8'));
        packageJson.name = 'coderoad-' + name;
        var packageJsonString = JSON.stringify(packageJson, null, 2);
        fs_1.writeFileSync('package.json', packageJsonString, 'utf8');
    }
}
exports.createPackageJson = createPackageJson;
function createTestFiles() {
    createFile(path_1.join('tutorial', '1', '01', '01.spec.js'));
    createFile(path_1.join('tutorial', '1', '01', '02.spec.js'));
    createFile(path_1.join('tutorial', '1', '02', '01.spec.js'));
    createFile(path_1.join('tutorial', '1', '02', '02.spec.js'));
}
exports.createTestFiles = createTestFiles;
