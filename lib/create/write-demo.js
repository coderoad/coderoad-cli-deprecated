"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var sort_package_json_1 = require('sort-package-json');
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
var folders = [
    'tutorial',
    path_1.join('tutorial', '01'),
    path_1.join('tutorial', '02')
];
var files = [
    '.gitignore',
    path_1.join('tutorial', 'tutorial.md'),
    path_1.join('tutorial', '01', 'page-one.md'),
    path_1.join('tutorial', '01', '01.spec.js'),
    path_1.join('tutorial', '01', '02.spec.js'),
    path_1.join('tutorial', '02', 'page-two.md'),
    path_1.join('tutorial', '02', '01.spec.js'),
    path_1.join('tutorial', '02', '02.spec.js')
];
function createTutorialMd() {
    return new Promise(function (resolve, reject) {
        folders.forEach(function (folder) { return createFolder(folder); });
        files.forEach(function (file) { return createFile(file); });
        resolve(true);
    });
}
exports.createTutorialMd = createTutorialMd;
function createPackageJson(name) {
    return new Promise(function (resolve, reject) {
        if (!file_1.fileExists('package.json')) {
            var inputPath = path_1.join(__dirname, '..', '..', 'setup', 'package.json');
            var packageJson = JSON.parse(fs_1.readFileSync(inputPath, 'utf8'));
            packageJson.name = 'coderoad-' + name;
            var packageJsonString = sort_package_json_1.sortPackageJson(JSON.stringify(packageJson, null, 2));
            fs_1.writeFileSync('package.json', packageJsonString, 'utf8');
            resolve(true);
        }
        else {
            resolve(true);
        }
    });
}
exports.createPackageJson = createPackageJson;
