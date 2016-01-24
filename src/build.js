"use strict";
var fs = require('fs');
const filePath = './src/README.md';
function line(char, times) {
    return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}
var regex = {
    '#': line('#', 1),
    '##': line('#', 2),
    '###': line('#', 3),
    '+': line('\\+', 1)
};
function parseWithCode(code, content) {
    if (!content) {
        return false;
    }
    if (content.match(regex[code])) {
        return regex[code].exec(content)[1];
    }
    else {
        return false;
    }
}
function build() {
    var result = {
        project: {},
        chapters: []
    };
    var lines = fs.readFileSync(filePath, 'utf8');
    var arrayOfLines = lines.split('\n');
    var chapterCount = 0;
    var pageCount = 0;
    for (var i = 0; i < arrayOfLines.length; i++) {
        var projectTitleMatch = parseWithCode('#', arrayOfLines[i]);
        if (projectTitleMatch) {
            result.project.title = projectTitleMatch;
            result.project.description = '';
            for (var j = i + 1; j < arrayOfLines.length; j++) {
                var chapterTitleMatch = parseWithCode('##', arrayOfLines[j]);
                if (!chapterTitleMatch) {
                    result.project.description.concat(arrayOfLines[j]);
                }
                else {
                    result.chapters.push({
                        title: chapterTitleMatch
                    });
                }
            }
        }
    }
    return result;
}
console.log(build());
