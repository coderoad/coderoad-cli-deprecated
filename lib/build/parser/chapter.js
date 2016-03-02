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
        switch (true) {
            case !!Match.isImport(line):
                lines = import_1.loadImport(lines, Match.isImport(line));
                continue;
            case !!Match.codeBlock(line):
                if (line.length > 3) {
                    result.chapters[index.chapter].description += line;
                    continue;
                }
                inCodeBlock = !inCodeBlock;
                continue;
            case !!Match.page(line):
                return page_1.page(result, lines.slice(i), index);
            case Match.chapter(line) && i > 1:
                return chapter(result, lines.slice(i), index);
            default:
                if (i > 1) {
                    result.chapters[index.chapter].description += '\n';
                }
                result.chapters[index.chapter].description += line;
        }
    }
    return result;
}
exports.chapter = chapter;
