"use strict";
var process = require('process');
var chalk = require('chalk');
function search(query) {
    if (query === 'undefined') {
        console.log(chalk.yellow("\n      Please provide a search query\n      Example: coderoad search react\n      "));
        process.exit(1);
    }
    console.log("Searching for \"" + query + "\"...");
    console.log(chalk.red('Search feature not implemented yet.'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
