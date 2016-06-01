"use strict";
var chalk_1 = require('chalk');
exports.success = function () {
    process.stdout.write(chalk_1.green(' ✓\n'));
    process.exit(0);
};
exports.fail = function () {
    process.stdout.write(chalk_1.red(' ✗\n'));
    process.exit(1);
};
