"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
var import_1 = require('./import');
function project(result, lines, index) {
    result.project = {
        title: '',
        description: ''
    };
    var i = -1;
    while (i < lines.length - 1) {
        i += 1;
        var line = lines[i];
        var importFile = Match.isImport(line);
        if (!!importFile) {
            lines = import_1.loadImport(lines, importFile);
        }
        else {
            var projectTitleMatch = Match.project(line);
            if (!!projectTitleMatch) {
                result.project.title = projectTitleMatch.trim();
            }
            else if (!!Match.chapter(line)) {
                return chapter_1.chapter(result, lines.slice(i), index);
            }
            else {
                if (i > 1) {
                    result.project.description += '\n';
                }
                result.project.description += line;
            }
        }
    }
    return result;
}
exports.project = project;
