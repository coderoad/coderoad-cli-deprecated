"use strict";
var chalk_1 = require('chalk');
var find_tutorials_1 = require('./find-tutorials');
var get_1 = require('../packageJson/get');
function tutorials() {
    var pj = get_1.default();
    if (!pj) {
        console.log(chalk_1.red("No package.json available"));
        return false;
    }
    return ([]
        .concat(find_tutorials_1.default(process.cwd(), pj.dependencies))
        .concat(find_tutorials_1.default(process.cwd(), pj.devDependencies)));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tutorials;
