"use strict";
var fs = require('fs');
var validate_1 = require('./validate');
var package_json_1 = require('./package-json');
var tutorial_md_1 = require('./tutorial-md');
function fileExists(path) {
    try {
        fs.accessSync(path, fs.R_OK | fs.W_OK);
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
function create(name) {
    validate_1.validatePackageName(name);
    console.log('Creating demo tutorial...');
    if (!fileExists('package.json')) {
        package_json_1.default(name);
    }
    if (!fileExists('tutorial.md')) {
        console.log('here');
        tutorial_md_1.default();
    }
    if (!fileExists('./tests')) {
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
