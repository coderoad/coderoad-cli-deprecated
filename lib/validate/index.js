"use strict";
var chalk_1 = require('chalk');
var packageJson_1 = require('./packageJson');
var coderoadJson_1 = require('./coderoadJson');
var getJson_1 = require('../utils/getJson');
var validation_messages_1 = require('./validation-messages');
function validate() {
    var pj = getJson_1.default(process.cwd(), 'package.json');
    var cj = getJson_1.default(process.cwd(), 'coderoad.json');
    if (!pj || !cj) {
        if (!pj) {
            console.log(chalk_1.red('Error: No package.json.'));
        }
        if (!cj) {
            console.log(chalk_1.red('Error: No coderoad.json.'));
        }
        return false;
    }
    var pjValidation = packageJson_1.default(pj);
    var cjValidation = coderoadJson_1.default(cj);
    if (pjValidation.errors.length || pjValidation.warnings.length) {
        console.log("         package.json issues:");
        validation_messages_1.default('Warning', pjValidation.warnings, chalk_1.yellow);
        validation_messages_1.default('Error', pjValidation.errors, chalk_1.red);
    }
    if (cjValidation.errors.length || cjValidation.warnings.length) {
        console.log("         coderoad.json issues:");
        validation_messages_1.default('Warning', cjValidation.warnings, chalk_1.yellow);
        validation_messages_1.default('Error', cjValidation.errors, chalk_1.red);
    }
    return pjValidation.errors.length === 0 && cjValidation.errors.length === 0;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validate;
