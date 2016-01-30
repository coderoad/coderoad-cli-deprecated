"use strict";
var chalk = require('chalk');
var validate_1 = require('./validate');
function publish(version) {
    validate_1.default(version);
    console.log("Publishing package version \"" + version + "\"...");
    console.log(chalk.red('Publish feature not implemented yet.'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = publish;
