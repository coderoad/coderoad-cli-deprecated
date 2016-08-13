"use strict";
var chalk_1 = require('chalk');
var find_tutorials_1 = require('./find-tutorials');
var getJson_1 = require('../utils/getJson');
function tutorials(_a) {
    var dir = _a.dir;
    var pj = getJson_1.default(dir, 'package.json');
    if (!pj) {
        console.log(chalk_1.red("No package.json available"));
        return null;
    }
    var removeDups = {};
    return ([]
        .concat(find_tutorials_1.default(dir, pj.dependencies))
        .concat(find_tutorials_1.default(dir, pj.devDependencies))
        .filter(function (tutorial) {
        if (!removeDups.hasOwnProperty(tutorial.name) && removeDups[tutorial.name] !== tutorial.version) {
            removeDups[tutorial.name] = tutorial.version;
            return true;
        }
        return false;
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tutorials;
