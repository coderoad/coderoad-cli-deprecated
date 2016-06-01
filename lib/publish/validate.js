"use strict";
var fs = require('fs');
var chalk_1 = require('chalk');
var node_file_exists_1 = require('node-file-exists');
function incrementVersion(version) {
    var finalDot = version.lastIndexOf('.');
    var start = version.substring(0, finalDot + 1);
    var patch = parseInt(version.substring(finalDot + 1, version.length), 10) + 1;
    return start + patch;
}
function versionIsGreaterThanCurrent(version) {
    if (!node_file_exists_1.default('package.json')) {
        console.log(chalk_1.yellow("\n  No available package.json file.Create one.\n  > npm init\n  "));
        process.exit(1);
    }
    var currentVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
    if (parseInt(version, 10) <= parseInt(currentVersion, 10)) {
        console.log(chalk_1.yellow("\n      Published version is not larger than current version.\n      Current: \"" + currentVersion + "\"\n      > coderoad publish \"" + incrementVersion(currentVersion) + "\"\n  "));
        process.exit(1);
    }
}
var semverRegex = /\b^(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)$\b/i;
function isValidVersion(version) {
    if (!version.match(semverRegex)) {
        console.log(chalk_1.yellow("\n  Not a valid semver version\n  > coderoad publish \"0.1.0\"\n  "));
        process.exit(1);
    }
}
function validateVersion(version) {
    isValidVersion(version);
    versionIsGreaterThanCurrent(version);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateVersion;
