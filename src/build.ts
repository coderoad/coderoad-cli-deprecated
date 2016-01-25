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

function build(filePath: string): Result {
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
function project(result: Result, lines: string[], index: Index) {
  let matchedAt = null;
  for (let i = 0; i < lines.length; i++) {
    var projectTitleMatch = parseWithCode('#', lines[i]);
    var chapterStart = parseWithCode('##', lines[i]);
    if (projectTitleMatch) {
      // project.title
      matchedAt = i;
      result.project.title = projectTitleMatch;
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
      index.page = 0;
      index.chapter += 1;
      result.chapters.push({
        title: chapterTitleMatch,
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
  let matchedAt = null;
  let hasBreak: number = null;

  for (let i = 0; i < lines.length; i++) {
    // matches
    let pageTitleMatch = parseWithCode('###', lines[i]);
    let nextChapterStart = parseWithCode('##', lines[i]);

    // page title
    if (pageTitleMatch && !matchedAt) {
      matchedAt = i;
      result.chapters[index.chapter].pages.push({
        title: pageTitleMatch,
        description: '',
        explanation: '',
        tasks: []
      });
      index.page += 1;

      // empty line
    } else if (!hasBreak && !lines[i].match(/\S/)) {
      hasBreak = i;

      // description / break / explanation
    } else if (pageTitleMatch || nextChapterStart) {
      if (hasBreak) {
        console.log('HERE!!!', hasBreak);
        console.log(lines.slice(matchedAt, hasBreak).toString());
        console.log(lines.slice(hasBreak, i).toString());


        result.chapters[index.chapter].pages[index.page - 1].description = lines.slice(matchedAt + 1, hasBreak).toString();
        result.chapters[index.chapter].pages[index.page - 1].explanation = lines.slice(hasBreak + 1, i).toString();
      } else {
        console.log('DOWN HERE');
        console.log(lines.slice(matchedAt + 1, i).toString());

        result.chapters[index.chapter].pages[index.page - 1].description = lines.slice(matchedAt + 1, i).toString();
      }

      // next chapter
      if (nextChapterStart) {
        return chapter(result, lines.slice(i), index);
      } else {
        return page(result, lines.slice(i), index);
      }
    }
  }
  console.log('*** Pages ***');
  console.log(result.chapters[0].pages[0]);
  console.log('** Result ***');
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
  //
  return result;
}

console.log(build('./src/README.md'));
