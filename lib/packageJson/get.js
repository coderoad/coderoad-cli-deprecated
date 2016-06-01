"use strict";
var node_file_exists_1 = require('node-file-exists');
var fs_1 = require('fs');
function getPackageJson() {
    var pathToPJ = './package.json';
    if (!node_file_exists_1.default(pathToPJ)) {
        return null;
    }
    var pj = fs_1.readFileSync(pathToPJ, 'utf8');
    return JSON.parse(pj);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getPackageJson;
