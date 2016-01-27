"use strict";
var chalk = require('chalk');
function validate(text) {
    isValidJSON(text);
    var jsonObject = JSON.parse(text);
    hasProjectInfo(jsonObject);
    hasPage(jsonObject);
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
function isValidJSON(text) {
    if (!/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        console.log(chalk.red("\n      Something went wrong. There seems to be an error in " + filePath + ".\n      "));
        process.exit(1);
    }
}
function hasProjectInfo(json) {
    var validTitle = json.project.title.length > 0, validDescription = json.project.description.length > 0;
    if (!(validTitle && validDescription)) {
        console.log(chalk.red("\n      Your tutorial is missing basic project information. Check the project title & description.\n      "));
        process.exit(1);
    }
}
function hasPage(json) {
    if (!(json.chapters[0].pages.length > 0 && !!json.chapters[0].pages[0].title)) {
        console.log(chalk.red("\n      Your tutorial requires at least one page.\n      "));
        process.exit(1);
    }
}
