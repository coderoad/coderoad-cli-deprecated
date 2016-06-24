"use strict";
var chalk_1 = require('chalk');
var find_tutorials_1 = require('./find-tutorials');
var getJson_1 = require('../utils/getJson');
function tutorials(dir) {
    var pj = getJson_1.default(dir, 'package.json');
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
