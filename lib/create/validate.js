"use strict";
var chalk = require('chalk');
var validateNpm = require('validate-npm-package-name');
var _ = require('lodash');
function validatePackageName(name) {
    var validated = validateNpm(name);
    if (!validated.validForNewPackages || !validated.validForOldPackages) {
        if (validated.errors) {
            validated.errors.forEach(function (error) {
                console.log(chalk.red('Package ' + error));
            });
        }
        if (validated.warnings) {
            validated.warnings.forEach(function (warning) {
                console.log(chalk.yellow('Package ' + warning));
            });
        }
        if (!validated.errors && !validated.warnings) {
            console.log(chalk.red("\n        Invalid package name. Try using kebab-case.\n        > coderoad create " + _.kebabCase(name) + "\n        "));
        }
        process.exit(1);
    }
}
exports.validatePackageName = validatePackageName;
