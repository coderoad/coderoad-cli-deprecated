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
    '+': line('\\+', 1),
    '@': line('@', 1)
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
function build(filePath) {
    var result = {
        project: {},
        chapters: []
    }, index = {
        chapter: -1,
        page: -1
    };
    var input = fs.readFileSync(filePath, 'utf8');
    var lines = input.split('\n');
    return project(result, lines, index);
}
function project(result, lines, index) {
    var matchedAt = null;
    for (var i = 0; i < lines.length; i++) {
        var projectTitleMatch = parseWithCode('#', lines[i]);
        var chapterStart = parseWithCode('##', lines[i]);
        if (projectTitleMatch) {
            matchedAt = i;
            result.project.title = projectTitleMatch;
        }
        else if (chapterStart) {
            result.project.description = lines.slice(matchedAt + 1, i).toString();
            chapter(result, lines.slice(i), index);
        }
    }
    return result;
}
function chapter(result, lines, index) {
    var matchedAt = null;
    for (var i = 0; i < lines.length; i++) {
        var chapterTitleMatch = parseWithCode('##', lines[i]);
        var pageStart = parseWithCode('###', lines[i]);
        if (chapterTitleMatch && !matchedAt) {
            matchedAt = i;
            index.chapter += 1;
            result.chapters.push({
                title: chapterTitleMatch,
                description: '',
                pages: []
            });
        }
        else if (pageStart) {
            result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
            return page(result, lines.slice(i), index);
        }
        else if (chapterTitleMatch) {
            result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
            return chapter(result, lines.slice(i), index);
        }
    }
    return result;
}
function page(result, lines, index) {
    var matchedAt = null;
    var firstBreak = null;
    for (var i = 0; i < lines.length; i++) {
        var pageTitleMatch = parseWithCode('###', lines[i]);
        var nextChapterStart = parseWithCode('##', lines[i]);
        if (pageTitleMatch && !matchedAt) {
            matchedAt = i;
            index.page += 1;
            result.chapters[index.chapter].pages.push({
                title: pageTitleMatch,
                description: '',
                explanation: ''
            });
        }
        else if (!firstBreak && lines[i].match(/\s*/)) {
            firstBreak = i;
        }
        else if (nextChapterStart || pageTitleMatch) {
            if (firstBreak) {
                result.chapters[index.chapter].pages[index.page].description = lines.slice(matchedAt + 1, firstBreak).toString();
                result.chapters[index.chapter].pages[index.page].explanation = lines.slice(firstBreak + 1, i).toString();
            }
            else {
                result.chapters[index.chapter].pages[index.page].description = lines.slice(matchedAt + 1, i).toString();
            }
            if (nextChapterStart) {
                return chapter(result, lines.slice(i), index);
            }
            else {
                return page(result, lines.slice(i), index);
            }
        }
    }
    console.log('*** Pages ***');
    console.log(result.chapters[0].pages);
    console.log('** Result ***');
    return result;
}
function task(result, lines, index) {
    return result;
}
console.log(build(filePath));
