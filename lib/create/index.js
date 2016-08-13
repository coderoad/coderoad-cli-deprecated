"use strict";
var validate_1 = require('./validate');
var write_demo_1 = require('./write-demo');
var chalk_1 = require('chalk');
function create(_a) {
    var dir = _a.dir, name = _a.name;
    return Promise.all([
        validate_1.validatePackageName(name),
        write_demo_1.createPackageJson(dir, name),
        write_demo_1.createTutorialMd(dir)
    ]).then(function () {
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
