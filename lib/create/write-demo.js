"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var sort_package_json_1 = require('sort-package-json');
var node_file_exists_1 = require('node-file-exists');
function createFile(dir, pathToFile) {
    try {
        if (!node_file_exists_1.default(pathToFile)) {
            var inputPath = path_1.join(__dirname, '..', '..', 'setup', pathToFile);
            var test = fs_1.readFileSync(inputPath, 'utf8');
            fs_1.writeFileSync(path_1.join(dir, pathToFile), test, 'utf8');
        }
    }
    catch (e) {
        console.log(e);
    }
}
function createFolder(pathToFolder) {
    try {
        if (!node_file_exists_1.default(pathToFolder)) {
            fs_1.mkdirSync(pathToFolder);
        }
    }
    catch (e) {
        console.log(e);
    }
}
var tutorialFolders = [[], ['01'], ['02']];
var tutorialDemo = [
    ['tutorial.md'],
    ['01', 'index.md'],
    ['01', '01.js'],
    ['01', '02.js'],
    ['02', 'index.md'],
    ['02', '01.js'],
    ['02', '02.js'],
];
function createTutorialMd(dir) {
    return new Promise(function (resolve, reject) {
        createFile(dir, '.gitignore');
        var tutorialDir = path_1.join(dir, 'tutorial');
        if (!node_file_exists_1.default(path_1.join(tutorialDir))) {
            tutorialFolders.forEach(function (folder) { return createFolder(path_1.join.apply(void 0, [dir, 'tutorial'].concat(folder))); });
            tutorialDemo.forEach(function (file) { return createFile(dir, path_1.join.apply(void 0, ['tutorial'].concat(file))); });
        }
        resolve(true);
    });
}
exports.createTutorialMd = createTutorialMd;
function createPackageJson(dir, name) {
    return new Promise(function (resolve, reject) {
        if (!node_file_exists_1.default(path_1.join(dir, 'package.json'))) {
            var inputPath = path_1.join(__dirname, '..', '..', 'setup', 'package.json');
            var packageJson = JSON.parse(fs_1.readFileSync(inputPath, 'utf8'));
            packageJson.name = 'coderoad-' + name;
            var packageJsonString = sort_package_json_1.sortPackageJson(JSON.stringify(packageJson, null, 2));
            fs_1.writeFileSync(path_1.join(dir, 'package.json'), packageJsonString, 'utf8');
            resolve(true);
        }
        else {
            resolve(true);
        }
    });
}
exports.createPackageJson = createPackageJson;
