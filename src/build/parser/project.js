"use strict";
var Match = require('./match');
var chapter_1 = require('./chapter');
function project(result, lines, index) {
    result.project = {
        title: '',
        description: ''
    };
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
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
    return result;
}
exports.project = project;
