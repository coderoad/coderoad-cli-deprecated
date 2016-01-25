import * as fs from 'fs';
const filePath = './src/README.md';
// JSON.stringify

function line(char: string, times: number) {
  return new RegExp('^' + char + '{' + times + '}(?!#)(.*?)$', 'gm');
}

var regex = {
  '#': line('#', 1),
  '##': line('#', 2),
  '###': line('#', 3),
  '+': line('\\+', 1),
  '@': line('@', 1)
};

function parseWithCode(code: string, content: string) {
  if (!content) {
    return false;
  }
  if (content.match(regex[code])) {
    return regex[code].exec(content)[1];
  } else {
    return false;
  }
}

function build(filePath) {
  var result = {
    project: {},
    chapters: []
  },
    index = {
      chapter: -1,
      page: -1
    };
  var input = fs.readFileSync(filePath, 'utf8');
  var lines = input.split('\n');

  // project
  // matches(#) = capture
  // exit on matches(##)
  // #
  // - ##
  return project(result, lines, index);
}

// project -> chapters
function project(result, lines: string[], index) {
  var matchedAt = null;
  for (var i = 0; i < lines.length; i++) {
    var projectTitleMatch = parseWithCode('#', lines[i]);
    var chapterStart = parseWithCode('##', lines[i]);
    if (projectTitleMatch) {
      // project.title
      matchedAt = i;
      result.project.title = projectTitleMatch;
    } else if (chapterStart) {
      result.project.description = lines.slice(matchedAt + 1, i).toString();
      chapter(result, lines.slice(i), index);
    }
  }
  return result;
}

// chapters -> pages
// continue from matches(##)
// matches(##) = capture
// matches(###) = page
// exit on end
// ##
// - ##
// - ###
function chapter(result, lines: string[], index) {
  var matchedAt = null;
  for (var i = 0; i < lines.length; i++) {
    var chapterTitleMatch = parseWithCode('##', lines[i]);
    var pageStart = parseWithCode('###', lines[i]);
    if (chapterTitleMatch && !matchedAt) {
      // chapter title
      matchedAt = i;
      index.chapter += 1;
      result.chapters.push({
        title: chapterTitleMatch,
        description: '',
        pages: []
      });
    } else if (pageStart) {
      result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
      return page(result, lines.slice(i), index);
    } else if (chapterTitleMatch) {
      result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
      return chapter(result, lines.slice(i), index);
    }
  }
  return result;
}

// pages -> explanation, next page, tasks
// continue from matches(###)
// matches(###) = capture
// matches(+) = task
// exit on end
// ###
// - ###
// - ##
// - +
function page(result, lines: string[], index) {
  var matchedAt = null;
  var firstBreak = null;
  for (var i = 0; i < lines.length; i++) {
    var pageTitleMatch = parseWithCode('###', lines[i]);
    var nextChapterStart = parseWithCode('##', lines[i]);
    if (pageTitleMatch && !matchedAt) {
      // chapter title
      matchedAt = i;
      index.page += 1;
      result.chapters[index.chapter].pages.push({
        title: pageTitleMatch,
        description: '',
        explanation: ''
      });
    } else if (!firstBreak && lines[i].match(/\s*/)) {
      firstBreak = i;
    } else if (nextChapterStart || pageTitleMatch) {
      if (firstBreak) {
        result.chapters[index.chapter].pages[index.page].description = lines.slice(matchedAt + 1, firstBreak).toString();
        result.chapters[index.chapter].pages[index.page].explanation = lines.slice(firstBreak + 1, i).toString();
      } else {
        result.chapters[index.chapter].pages[index.page].description = lines.slice(matchedAt + 1, i).toString();
      }
      if (nextChapterStart) {
        return chapter(result, lines.slice(i), index);
      } else {
        return page(result, lines.slice(i), index);
      }
    }
  }
  console.log('*** Pages ***');
  console.log(result.chapters[0].pages);
  console.log('** Result ***')
  return result;
}

// task
// continue from matches(+)
// matches(@) = capture action
// exit on matches (##)
// exit on end
// +
// - @test
// - @action
// - @hint
function task(result, lines, index) {
  return result;
}

console.log(build(filePath));
