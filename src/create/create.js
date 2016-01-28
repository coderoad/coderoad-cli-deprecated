"use strict";
var fs = require('fs');
var validate_1 = require('./validate');
var package_json_1 = require('./package-json');
function fileExists(path) {
    try {
        fs.accessSync('package.json', fs.R_OK | fs.W_OK);
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
        fs.writeFileSync('package.json', package_json_1.default(name), 'utf8');
    }
    if (!fileExists('tutorial.md')) {
        fs.writeFileSync('tutorial.md', fs.readFileSync('./setup/tutorial.md'), 'utf8');
    }
    if (!fileExists('./tests')) {
        fs.writeFileSync('./tests/pageOneTest.spec.js', fs.readFileSync('./setup/tests/page-one-test.spec.js'));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
