"use strict";
var chalk_1 = require('chalk');
var packageJson_1 = require('./packageJson');
var get_1 = require('../packageJson/get');
function validate() {
    var pj = get_1.default(process.cwd());
    if (!pj) {
        console.log(chalk_1.red('Error: No package.json.'));
        return false;
    }
    var validation = packageJson_1.default(pj);
    getValidationMessages(validation.warnings, chalk_1.yellow);
    return getValidationMessages(validation.errors, chalk_1.red);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
function getValidationMessages(validation, color) {
    if (validation && validation.length) {
        validation.forEach(function (e) {
            console.log(color("\n        Error: " + e.name + " " + e.msg + ".\n        Example: " + e.example + "\n      "));
        });
        return false;
    }
    return true;
}
