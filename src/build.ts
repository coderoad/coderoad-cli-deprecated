import * as fs from 'fs';
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


function isEmpty(line: string): boolean {
  return !line.length || !!line.match(/^\s+?[\n\r]/);
}

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

function build(filePath: string) {
  var result = {
    project: {},
    chapters: []
  },
    index = {
      chapter: -1,
      page: -1,
      task: -1
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
function project(result: Result, lines: string[], index: Index) {
  let matchedAt = null;
  for (let i = 0; i < lines.length; i++) {
    var projectTitleMatch = parseWithCode('#', lines[i]);
    var chapterStart = parseWithCode('##', lines[i]);
    if (projectTitleMatch) {
      // project.title
      matchedAt = i;
      result.project.title = projectTitleMatch.trim();
    } else if (chapterStart) {
      result.project.description = lines.slice(matchedAt + 1, i).toString();
      return chapter(result, lines.slice(i), index);
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
function chapter(result: Result, lines: string[], index: Index): Result {
  var matchedAt = null;
  for (let i = 0; i < lines.length; i++) {
    // matches
    let chapterTitleMatch = parseWithCode('##', lines[i]);
    let pageStart = parseWithCode('###', lines[i]);

    // chapter title
    if (chapterTitleMatch && !matchedAt) {
      matchedAt = i;
      index.page = -1;
      index.chapter += 1;
      result.chapters.push({
        title: chapterTitleMatch.trim(),
        description: '',
        pages: []
      });
      // next page
    } else if (pageStart) {
      result.chapters[index.chapter].description = lines.slice(matchedAt + 1, i).toString();
      return page(result, lines.slice(i), index);
      // next chapter
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
function page(result: Result, lines: string[], index: Index) {
  let hasBreak: number = null;
  index.page += 1;
  index.task = -1;
  result.chapters[index.chapter].pages.push({
    title: parseWithCode('###', lines[0]).trim(),
    description: '',
    explanation: '',
    tasks: []
  });
  for (let i = 1; i < lines.length; i++) {
    // matches
    let pageTitleMatch = parseWithCode('###', lines[i]);
    let nextChapter = parseWithCode('##', lines[i]);
    let nextTask = parseWithCode('+', lines[i]);
    // 1. page title
    if (!hasBreak && isEmpty(lines[i])) {
      hasBreak = i;
      // 3. exit on page title match again or next chapter
    } else if (!!pageTitleMatch || !!nextChapter || !!nextTask) {

      // add to result
      if (hasBreak) {
        result.chapters[index.chapter].pages[index.page].description = lines.slice(1, hasBreak).toString();
        result.chapters[index.chapter].pages[index.page].explanation = lines.slice(hasBreak + 1, i).toString();
      } else {
        result.chapters[index.chapter].pages[index.page].description = lines.slice(1, i).toString();
      }
      // next chapter
      if (!!nextChapter) {
        return chapter(result, lines.slice(i), index);
        // next page
      } else if (!!pageTitleMatch) {
        return page(result, lines.slice(i), index);
      } else if (!!nextTask) {
        return task(result, lines.slice(i), index);
      }
      return result;
    }
  }
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
function task(result: Result, lines: string[], index: Index) {
  result.chapters[index.chapter].pages[index.page].tasks.push({
    title: parseWithCode('+', lines[0]),
    description: '',
    tests: [],
    actions: []
  });
  index.task += 1;
  for (let i = 1; i < lines.length; i++) {
    // matches
    let nextPage = parseWithCode('###', lines[i]);
    let nextChapter = parseWithCode('##', lines[i]);
    let nextTask = parseWithCode('+', lines[i]);
    let isPossibleAction = lines[i].match(/^@/);

    if (!!nextPage || !!nextChapter || !!nextTask) {
      result.chapters[index.chapter].pages[index.page].tasks[index.task].description = lines.slice(1, i).toString();
    }
    if (!!nextTask) {
      return task(result, lines.slice(i), index);
    } else if (!!nextPage) {
      return page(result, lines.slice(i), index);
    } else if (!!nextChapter) {
      return chapter(result, lines.slice(i), index);
    } else if (!!isPossibleAction) {
      let action = lines[i].slice(1).split('(')[0];
      let target = /\((.*?)\)$/.exec(lines[i])[1];
      switch (action) {
        case 'test':
          result.chapters[index.chapter].pages[index.page].tasks[index.task].tests.push(target);
          break;
        case 'action':
          result.chapters[index.chapter].pages[index.page].tasks[index.task].actions.push(target);
          break;
        default:
          console.log('Invalid task action');
      }
    }
  }
  return result;
}

console.log(build('./src/README.md').chapters[0].pages[1]);
// build('./src/README.md');
