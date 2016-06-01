"use strict";
var chalk_1 = require('chalk');
var validate_1 = require('./validate');
function search(query) {
    validate_1.validateQuery(query);
    console.log("Searching for \"coderoad-" + query + "\"...");
    console.log(chalk_1.yellow('Search feature not fully implemented yet.\n'));
    console.log('To search for tutorials follow the instructions below: \n');
    console.log("Search tutorials on npm:\n    > npm search coderoad tutorial\n  ");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
