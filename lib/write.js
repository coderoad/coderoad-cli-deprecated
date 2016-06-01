"use strict";
var chalk_1 = require('chalk');
exports.success = function () { return process.stdout.write(chalk_1.green(' ✓\n')); };
exports.fail = function () { return process.stdout.write(chalk_1.red(' ✗\n')); };
