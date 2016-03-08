"use strict";
var validate_1 = require('./validate');
var write_demo_1 = require('./write-demo');
var build_1 = require('../build/build');
function create(name) {
    validate_1.validatePackageName(name);
    console.log('Creating demo tutorial...');
    write_demo_1.createPackageJson(name);
    write_demo_1.createTutorialMd();
    write_demo_1.createTestFiles();
    var tutorial = 'tutorial/tutorial.md';
    var output = 'coderoad.json';
    build_1.default(tutorial, output);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
