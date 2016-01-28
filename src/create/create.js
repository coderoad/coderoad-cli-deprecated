"use strict";
var validate_1 = require('./validate');
function create(name) {
    validate_1.validatePackageName(name);
    console.log('Creating demo tutorial...');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
