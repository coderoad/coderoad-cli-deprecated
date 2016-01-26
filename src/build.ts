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
  '@': line('@', 1),
  '```': line('`', 3)
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
    project: {
      title: '',
      description: ''
    },
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
      return chapter(result, lines.slice(i), index);
    } else {
      result.project.description += lines[i] + '\n';
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
      return page(result, lines.slice(i), index);
      // next chapter
    } else if (chapterTitleMatch) {
      return chapter(result, lines.slice(i), index);
      // add to description
    } else {
      result.chapters[index.chapter].description += lines[i] + '\n';
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
  let inCodeBlock = false;
  for (let i = 1; i < lines.length; i++) {
    // matches
    let pageTitleMatch = parseWithCode('###', lines[i]);
    let nextChapter = parseWithCode('##', lines[i]);
    let nextTask = parseWithCode('+', lines[i]);
    let codeBlock = parseWithCode('```', lines[i]);

    if (!!codeBlock) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      // 1. page title
      if (!hasBreak && isEmpty(lines[i])) {
        hasBreak = i;
        // 3. exit on page title match again or next chapter
      } else if (!!nextChapter) {
        return chapter(result, lines.slice(i), index);
        // next page
      } else if (!!pageTitleMatch) {
        return page(result, lines.slice(i), index);
      } else if (!!nextTask) {
        return task(result, lines.slice(i), index);
      } else {
        // description || explanation
        if (!hasBreak) {
          result.chapters[index.chapter].pages[index.page].description += lines[i] + '\n';
        } else {
          result.chapters[index.chapter].pages[index.page].explanation += lines[i] + '\n';
        }
      }
    }
  }
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
function task(result: Result, lines: string[], index: Index) {
  result.chapters[index.chapter].pages[index.page].tasks.push({
    title: parseWithCode('+', lines[0]),
    description: '',
    tests: [],
    actions: []
  });
  index.task += 1;
  let inCodeBlock = false;
  for (let i = 1; i < lines.length; i++) {
    // matches
    let nextPage = parseWithCode('###', lines[i]);
    let nextChapter = parseWithCode('##', lines[i]);
    let nextTask = parseWithCode('+', lines[i]);
    let isPossibleAction = lines[i].match(/^@action|test|hint/);
    let codeBlock = parseWithCode('```', lines[i]);

    if (!!codeBlock) {
      inCodeBlock = !inCodeBlock;
    }
    // add actions
    if (!inCodeBlock) {
      if (!!isPossibleAction) {
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
      } else if (!!nextTask) {
        return task(result, lines.slice(i), index);
        // exit on page
      } else if (!!nextPage) {
        return page(result, lines.slice(i), index);
        // exit on chapter
      } else if (!!nextChapter) {
        return chapter(result, lines.slice(i), index);
        // task description +
      } else {
        result.chapters[index.chapter].pages[index.page].tasks[index.task].description += lines[i] + '\n';
      }
    }
  }
  return result;
}

function removeLineBreaks(text: string) {
  if (text.slice(-2) === '\n') {
    return removeLineBreaks(text.slice(0, -2));
  } else if (text.slice(0, 2) === '\n') {
    return removeLineBreaks(text.slice(2));
  } else {
    return text.trim();
  }
}

function cleanup(result) {
  result.project.description = removeLineBreaks(result.project.description);
  result.chapters.map((chapter) => {
    chapter.description = removeLineBreaks(chapter.description);
    chapter.pages.map((page) => {
      page.description = removeLineBreaks(page.description);
      page.explanation = removeLineBreaks(page.explanation);
      page.tasks.map((task) => {
        task.description = removeLineBreaks(task.description);
      });
    });
  });
  return JSON.stringify(result, null, 2);
}

function isValidJSON(text: string) {
  if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return true;
  } else {
    return false
  }
}

var input = process.argv[2];
if (!input) {
  throw ('Pass in path to .md file');
}
var output = process.argv[3];
if (!output) {
  throw ('Pass in path to output cr.json file');
}

// Build
var result = cleanup(build(input));
if (!isValidJSON(result)) {
  throw ('Invalid JSON output');
}

// Write
fs.writeFile(output, result), 'utf8', function(err) {
  if (err)
    return console.log(err);
  console.log(input + ' > ' + output);
});
