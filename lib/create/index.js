"use strict";
var validate_1 = require('./validate');
var write_demo_1 = require('./write-demo');
var build_1 = require('../build/build');
function create(name) {
    if (!validate_1.validatePackageName(name)) {
        return false;
    }
    process.stdout.write("Creating demo tutorial \"coderoad-" + name + "\"...");
    return Promise.all([
        write_demo_1.createPackageJson(name),
        write_demo_1.createTutorialMd()
    ]).then(function () {
        build_1.default('tutorial/tutorial.md', 'coderoad.json');
        return true;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
