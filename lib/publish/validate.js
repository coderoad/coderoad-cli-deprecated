"use strict";
var fs = require('fs');
var chalk = require('chalk');
var file_1 = require('../tools/file');
function versionIsGreaterThanCurrent(version) {
    if (!file_1.fileExists('package.json')) {
        console.log(chalk.yellow("\n  No available package.json file.Create one.\n  > npm init\n  "));
        process.exit(1);
    }
    var currentVersion = fs.readFileSync('package.json', 'utf8').version;
    if (parseInt(version) <= parseInt(currentVersion)) {
        var incrementedVersion = parseInt(currentVersion) + 0.0;
        .1;
        console.log(chalk.yellow("\n      Published version is not larger than current version.\n      Current: \"" + currentVersion + "\"\n      > coderoad publish \"" + incrementedVersion + "\"\n  "));
        process.exit(1);
    }
}
var semverRegex = /\b^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$\b/i;
function isValidVersion(version) {
    if (!version.match(semverRegex)) {
        console.log(chalk.yellow("\n  Not a valid semver version\n  > coderoad publish \"0.1.0\"\n  "));
        process.exit(1);
    }
}
function validateVersion(version) {
    isValidVersion(version);
    versionIsGreaterThanCurrent(version);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateVersion;
