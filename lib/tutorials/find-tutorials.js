"use strict";
var path_1 = require('path');
var fs_1 = require('fs');
var node_file_exists_1 = require('node-file-exists');
var is_tutorial_1 = require('./is-tutorial');
function findTutorials(dir, deps) {
    if (!!deps && Object.keys(deps).length > 0) {
        return (Object.keys(deps)
            .filter(function (name) { return is_tutorial_1.isTutorial(dir, name); })
            .map(function (name) {
            var pathToTutorialPackageJson = path_1.join(dir, 'node_modules', name, 'package.json');
            if (!node_file_exists_1.default(pathToTutorialPackageJson)) {
                console.log("Error with " + name + ": no package.json file found.");
                return {
                    name: name,
                    version: 'NOT INSTALLED',
                    latest: 'NOT INSTALLED',
                    isLatest: true,
                };
            }
            var version = JSON.parse(fs_1.readFileSync(pathToTutorialPackageJson, 'utf8')).version;
            return {
                name: name,
                version: version,
                latest: version,
                isLatest: true,
            };
        }));
    }
    else {
        return [];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findTutorials;
