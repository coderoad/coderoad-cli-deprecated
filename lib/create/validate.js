"use strict";
var chalk_1 = require('chalk');
var validateNpm = require('validate-npm-package-name');
var lodash_kebabcase_1 = require('lodash.kebabcase');
function validatePackageName(name) {
    var validated = validateNpm(name);
    if (!validated.validForNewPackages || !validated.validForOldPackages) {
        if (validated.errors) {
            validated.errors.forEach(function (error) {
                console.log(chalk_1.red('\nPackage ' + error));
            });
        }
        if (validated.warnings) {
            validated.warnings.forEach(function (warning) {
                console.log(chalk_1.yellow('\nPackage ' + warning));
            });
        }
        if (!validated.errors && !validated.warnings) {
            console.log(chalk_1.red("\n        Invalid package name. Try using kebab-case.\n        > coderoad create " + lodash_kebabcase_1.default(name) + "\n      "));
        }
        return false;
    }
    return true;
}
exports.validatePackageName = validatePackageName;
