"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var node_file_exists_1 = require('node-file-exists');
var cleanup_1 = require('./cleanup');
var settings_1 = require('./settings');
function loadImport(_a) {
    var dir = _a.dir, lines = _a.lines, pathToMd = _a.pathToMd;
    pathToMd = cleanup_1.trimQuotes(pathToMd);
    if (!pathToMd.match(/\.md$/)) {
        if (node_file_exists_1.default(path_1.join(dir, settings_1.tutorialDir, pathToMd.concat('.md')))) {
            pathToMd = pathToMd.concat('.md');
        }
        else {
            pathToMd = path_1.join(pathToMd, 'index.md');
        }
    }
    var realPath = path_1.join(dir, settings_1.tutorialDir, pathToMd);
    if (!node_file_exists_1.default(realPath)) {
        console.log('Invalid path to markdown file', realPath);
        return;
    }
    var importLines = fs_1.readFileSync(realPath, 'utf8');
    var splitLines = importLines.split('\n');
    return lines.concat(splitLines);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadImport;
