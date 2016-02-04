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
            return chapter_1.default(result, lines.slice(i), index);
        }
        else {
            result.project.description += line + '\n';
        }
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = project;