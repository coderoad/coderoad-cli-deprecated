"use strict";
var validate_1 = require('./validate');
var write_demo_1 = require('./write-demo');
var readme_1 = require('../build/readme');
function create(name) {
    validate_1.validatePackageName(name);
    console.log('Creating demo tutorial...');
    write_demo_1.createPackageJson(name);
    write_demo_1.createTutorialMd();
    write_demo_1.createTestFiles();
    readme_1.createReadme();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;