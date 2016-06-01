"use strict";
var validate_1 = require('./validate');
var write_demo_1 = require('./write-demo');
var chalk_1 = require('chalk');
var build_1 = require('../build');
function create(name) {
    return Promise.all([
        validate_1.validatePackageName(name),
        write_demo_1.createPackageJson(name),
        write_demo_1.createTutorialMd()
    ]).then(function () {
        build_1.default('tutorial/tutorial.md', 'coderoad.json');
        return true;
    }).catch(function (e) {
        switch (e.type) {
            case 'error':
                console.log(chalk_1.red(e.msg));
                break;
            case 'warning':
                console.log(chalk_1.yellow(e.msg));
                break;
            default:
                console.log(e);
        }
        return false;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
