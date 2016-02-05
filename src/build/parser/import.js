"use strict";
var fs = require('fs');
var path = require('path');
var file_1 = require('../../tools/file');
var cleanup_1 = require('../cleanup');
function loadImport(lines, pathToMd) {
    pathToMd = cleanup_1.trimQuotes(pathToMd);
    if (!pathToMd.match(/\.md$/)) {
        pathToMd = pathToMd.concat('.md');
    }
    var realPath = path.join(process.cwd(), pathToMd);
    if (!file_1.fileExists(pathToMd)) {
        console.log('Invalid path to markdown file', realPath);
        return;
    }
    var importLines = fs.readFileSync(realPath, 'utf8');
    var splitLines = importLines.split('\n');
    return lines.concat(splitLines);
}
exports.loadImport = loadImport;
