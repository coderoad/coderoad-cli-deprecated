"use strict";
var chalk = require('chalk');
var lint_1 = require('./lint');
function filePath(filePath) {
    if (!filePath) {
        console.log(chalk.red("\n    Pass in a path to your .md file\n    > coderoad build \"./src/tutorial.md\"\n    "));
        return false;
    }
    return true;
}
exports.filePath = filePath;
function result(text) {
    if (!lint_1.isValidJSON(text)) {
        return false;
    }
    var jsonObject = JSON.parse(text);
    return [
        lint_1.hasTutorialInfo(jsonObject),
        lint_1.hasPage(jsonObject),
        lint_1.lintOutput(jsonObject)
    ].every(function (x) { return !!x; });
}
exports.result = result;
