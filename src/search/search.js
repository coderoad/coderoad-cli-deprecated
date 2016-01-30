"use strict";
var chalk = require('chalk');
var validate_1 = require('./validate');
function search(query) {
    validate_1.validateQuery(query);
    console.log("Searching for \"coderoad-" + query + "\"...");
    console.log(chalk.red('Search feature not fully implemented yet.'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
