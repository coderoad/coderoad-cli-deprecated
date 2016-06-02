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
var folders = function (dir) { return [
    path_1.join(dir, 'tutorial'),
    path_1.join(dir, 'tutorial', '01'),
    path_1.join(dir, 'tutorial', '02')
]; };
var files = [
    path_1.join('.gitignore'),
    path_1.join('tutorial', 'tutorial.md'),
    path_1.join('tutorial', '01', 'page-one.md'),
    path_1.join('tutorial', '01', '01.spec.js'),
    path_1.join('tutorial', '01', '02.spec.js'),
    path_1.join('tutorial', '02', 'page-two.md'),
    path_1.join('tutorial', '02', '01.spec.js'),
    path_1.join('tutorial', '02', '02.spec.js')
];
function createTutorialMd(dir) {
    return new Promise(function (resolve, reject) {
        folders(dir).forEach(function (folder) { return createFolder(folder); });
        files.forEach(function (file) { return createFile(dir, file); });
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
