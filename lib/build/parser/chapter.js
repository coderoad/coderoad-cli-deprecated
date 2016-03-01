"use strict";
var Match = require('./match');
var page_1 = require('./page');
var import_1 = require('./import');
function chapter(result, lines, index) {
    index.page = -1;
    index.chapter += 1;
    result.chapters.push({
        title: Match.chapter(lines[0]).trim(),
        description: '',
        pages: []
    });
    var inCodeBlock = false;
    var i = 0;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        var importFile = Match.isImport(line);
        if (!!importFile) {
            lines = import_1.loadImport(lines, importFile);
            continue;
        }
        if (!!Match.codeBlock(line)) {
            if (line.length > 3) {
                result = addToDescription(i, result, line, index);
                continue;
            }
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            if (Match.page(line)) {
                return page_1.page(result, lines.slice(i), index);
            }
            else if (Match.chapter(line) && i > 1) {
                return chapter(result, lines.slice(i), index);
            }
            else {
                result = addToDescription(i, result, line, index);
            }
        }
    }
    return result;
}
exports.chapter = chapter;
function addToDescription(i, result, line, index) {
    if (i > 1) {
        result.chapters[index.chapter].description += '\n';
    }
    result.chapters[index.chapter].description += line;
    return result;
}
