"use strict";
var fs = require('fs');
var path = require('path');
var file_1 = require('../tools/file');
function createFile(pathToFile) {
    if (!file_1.fileExists(pathToFile)) {
        var inputPath = path.join(__dirname, 'setup', pathToFile);
        var test = fs.readFileSync(inputPath, 'utf8');
        fs.writeFileSync(pathToFile, test, 'utf8');
    }
}
function createFolder(pathToFolder) {
    if (!file_1.fileExists(pathToFolder)) {
        fs.mkdirSync(pathToFolder);
    }
}
function createTutorialMd() {
    createFolder('tutorial');
    createFile('tutorial/tutorial.md');
    createFolder('tutorial/chapter-01');
    createFolder('tutorial/chapter-01/page-01');
    createFile('tutorial/chapter-01/page-01/page-one.md');
    createFolder('tutorial/chapter-01/page-02');
    createFile('tutorial/chapter-01/page-02/page-two.md');
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
    createFile('tutorial/chapter-01/page-01/task-01.spec.js');
    createFile('tutorial/chapter-01/page-01/task-02.spec.js');
    createFile('tutorial/chapter-01/page-02/task-01.spec.js');
    createFile('tutorial/chapter-01/page-02/task-02.spec.js');
}
exports.createTestFiles = createTestFiles;
