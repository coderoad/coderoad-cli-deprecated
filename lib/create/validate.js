"use strict";
var validateNpm = require('validate-npm-package-name');
var lodash_kebabcase_1 = require('lodash.kebabcase');
function validatePackageName(name) {
    return new Promise(function (resolve, reject) {
        var validated = validateNpm(name);
        if (!validated.validForNewPackages || !validated.validForOldPackages) {
            if (validated.errors) {
                validated.errors.forEach(function (error) {
                    throw {
                        type: 'error',
                        msg: '\nPackage ' + error,
                    };
                });
            }
            if (validated.warnings) {
                validated.warnings.forEach(function (warning) {
                    throw {
                        type: 'warning',
                        msg: '\nPackage ' + warning,
                    };
                });
            }
            if (!validated.errors && !validated.warnings) {
                throw {
                    type: 'error',
                    msg: "\nInvalid package name. Try using kebab-case.\n        > coderoad create " + lodash_kebabcase_1.default(name) + "\n"
                };
            }
        }
        resolve(true);
    });
}
exports.validatePackageName = validatePackageName;
