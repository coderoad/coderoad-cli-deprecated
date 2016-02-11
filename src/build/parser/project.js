"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var import_1 = require('./import');
function project(result, lines, index) {
    result.project = {
        title: '',
        description: ''
    };
    var inCodeBlock = false;
    var i = -1;
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
                result = addToDescription(i, result, line);
                continue;
            }
            inCodeBlock = !inCodeBlock;
        }
        if (!inCodeBlock) {
            var projectTitleMatch = Match.project(line);
            if (!!projectTitleMatch) {
                result.project.title = projectTitleMatch.trim();
            }
            else if (!!Match.chapter(line)) {
                return chapter_1.chapter(result, lines.slice(i), index);
            }
            else {
                result = addToDescription(i, result, line);
            }
        }
    }
    return result;
}
exports.project = project;
function addToDescription(i, result, line) {
    if (i > 1) {
        result.project.description += '\n';
    }
    result.project.description += line;
    return result;
}
