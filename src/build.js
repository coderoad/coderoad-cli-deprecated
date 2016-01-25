"use strict";
var fs = require('fs');
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
    let matchedAt = null;
    for (let i = 0; i < lines.length; i++) {
        var projectTitleMatch = parseWithCode('#', lines[i]);
        var chapterStart = parseWithCode('##', lines[i]);
        if (projectTitleMatch) {
            matchedAt = i;
            result.project.title = projectTitleMatch;
        }
        else if (chapterStart) {
            result.project.description = lines.slice(matchedAt + 1, i).toString();
            return chapter(result, lines.slice(i), index);
        }
    }
    return result;
}
function chapter(result, lines, index) {
    var matchedAt = null;
    for (let i = 0; i < lines.length; i++) {
        let chapterTitleMatch = parseWithCode('##', lines[i]);
        let pageStart = parseWithCode('###', lines[i]);
        if (chapterTitleMatch && !matchedAt) {
            matchedAt = i;
            index.page = 0;
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
    let matchedAt = null;
    let hasBreak = null;
    for (let i = 0; i < lines.length; i++) {
        let pageTitleMatch = parseWithCode('###', lines[i]);
        let nextChapterStart = parseWithCode('##', lines[i]);
        if (pageTitleMatch && !matchedAt) {
            matchedAt = i;
            result.chapters[index.chapter].pages.push({
                title: pageTitleMatch,
                description: '',
                explanation: '',
                tasks: []
            });
            index.page += 1;
        }
        else if (!hasBreak && !lines[i].match(/\S/)) {
            hasBreak = i;
        }
        else if (pageTitleMatch || nextChapterStart) {
            if (hasBreak) {
                console.log('HERE!!!', hasBreak);
                console.log(lines.slice(matchedAt, hasBreak).toString());
                console.log(lines.slice(hasBreak, i).toString());
                result.chapters[index.chapter].pages[index.page - 1].description = lines.slice(matchedAt + 1, hasBreak).toString();
                result.chapters[index.chapter].pages[index.page - 1].explanation = lines.slice(hasBreak + 1, i).toString();
            }
            else {
                console.log('DOWN HERE');
                console.log(lines.slice(matchedAt + 1, i).toString());
                result.chapters[index.chapter].pages[index.page - 1].description = lines.slice(matchedAt + 1, i).toString();
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
    console.log(result.chapters[0].pages[0]);
    console.log('** Result ***');
    return result;
}
function task(result, lines, index) {
    return result;
}
console.log(build('./src/README.md'));
