"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var chalk_1 = require('chalk');
var settings = null;
try {
    settings = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), 'package.json'), 'utf8'));
}
catch (e) {
    console.log(chalk_1.red('No package.json config found in directory ', process.cwd(), e));
}
exports.tutorialDir = settings.dir || 'tutorial';
