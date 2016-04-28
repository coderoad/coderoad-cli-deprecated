"use strict";
var chalk_1 = require('chalk');
function validateQuery(query) {
    if (query === 'undefined') {
        console.log(chalk_1.yellow("\n      Please provide a search query\n      > coderoad search \"query\"\n      "));
        process.exit(1);
    }
}
exports.validateQuery = validateQuery;
