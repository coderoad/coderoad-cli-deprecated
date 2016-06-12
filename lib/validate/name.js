"use strict";
var validateNpm = require('validate-npm-package-name');
function validateName(name) {
    var validated = validateNpm(name);
    if (!validated.validForNewPackages || !validated.validForOldPackages) {
        return false;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateName;
