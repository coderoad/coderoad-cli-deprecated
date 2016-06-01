"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var node_file_exists_1 = require('node-file-exists');
var cleanup_1 = require('./cleanup');
var settings_1 = require('./settings');
function loadImport(lines, pathToMd) {
    pathToMd = cleanup_1.trimQuotes(pathToMd);
    if (!pathToMd.match(/\.md$/)) {
        pathToMd = pathToMd.concat('.md');
    }
    var realPath = path_1.join(process.cwd(), settings_1.tutorialDir, pathToMd);
    if (!node_file_exists_1.default(realPath)) {
        console.log('Invalid path to markdown file', realPath);
        return;
    }
    var importLines = fs_1.readFileSync(realPath, 'utf8');
    var splitLines = importLines.split('\n');
    return lines.concat(splitLines);
}
exports.loadImport = loadImport;
