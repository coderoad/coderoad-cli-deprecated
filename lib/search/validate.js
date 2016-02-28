"use strict";
var chalk = require('chalk');
function validateQuery(query) {
    if (query === 'undefined') {
        console.log(chalk.yellow("\n      Please provide a search query\n      > coderoad search \"query\"\n      "));
        process.exit(1);
    }
}
exports.validateQuery = validateQuery;
