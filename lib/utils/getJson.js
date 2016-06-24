"use strict";
var node_file_exists_1 = require('node-file-exists');
var fs_1 = require('fs');
var path_1 = require('path');
function getJson(dir, file) {
    var pathToFile = path_1.resolve(dir, file);
    if (!node_file_exists_1.default(pathToFile)) {
        return null;
    }
    return JSON.parse(fs_1.readFileSync(pathToFile, 'utf8'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getJson;
