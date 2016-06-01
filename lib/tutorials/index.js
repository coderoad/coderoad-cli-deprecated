"use strict";
var chalk_1 = require('chalk');
var find_tutorials_1 = require('./find-tutorials');
var get_1 = require('../packageJson/get');
function tutorials(dir) {
    var pj = get_1.default(dir);
    if (!pj) {
        console.log(chalk_1.red("No package.json available"));
        return null;
    }
    return ([]
        .concat(find_tutorials_1.default(dir, pj.dependencies))
        .concat(find_tutorials_1.default(dir, pj.devDependencies)));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tutorials;
