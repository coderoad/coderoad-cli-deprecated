"use strict";
var chalk = require('chalk');
var lint_1 = require('./lint');
function filePath(filePath) {
    if (!filePath) {
        console.log(chalk.red("\n    Pass in a path to your .md file\n    > coderoad build \"./src/tutorial.md\"\n    "));
        return false;
    }
}
exports.filePath = filePath;
function result(text) {
    lint_1.isValidJSON(text);
    var jsonObject = JSON.parse(text);
    lint_1.hasTutorialInfo(jsonObject);
    lint_1.hasPage(jsonObject);
    lint_1.lintOutput(jsonObject);
    return true;
}
exports.result = result;
