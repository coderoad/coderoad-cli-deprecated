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
    return new Promise(function (resolve, reject) {
        createFile('.gitignore');
        createFolder('tutorial');
        createFile(path_1.join('tutorial', 'tutorial.md'));
        createFolder(path_1.join('tutorial', '01'));
        createFile(path_1.join('tutorial', '01', 'page-one.md'));
        createFile(path_1.join('tutorial', '01', '01.spec.js'));
        createFile(path_1.join('tutorial', '01', '02.spec.js'));
        createFolder(path_1.join('tutorial', '02'));
        createFile(path_1.join('tutorial', '02', 'page-two.md'));
        createFile(path_1.join('tutorial', '02', '01.spec.js'));
        createFile(path_1.join('tutorial', '02', '02.spec.js'));
        resolve();
    });
}
exports.createTutorialMd = createTutorialMd;
function createPackageJson(name) {
    return new Promise(function (resolve, reject) {
        if (!file_1.fileExists('package.json')) {
            var inputPath = path_1.join(__dirname, '..', '..', 'setup', 'package.json');
            var packageJson = JSON.parse(fs_1.readFileSync(inputPath, 'utf8'));
            packageJson.name = 'coderoad-' + name;
            var packageJsonString = JSON.stringify(packageJson, null, 2);
            fs_1.writeFileSync('package.json', packageJsonString, 'utf8');
            resolve();
        }
        else {
            resolve();
        }
    });
}
exports.createPackageJson = createPackageJson;
