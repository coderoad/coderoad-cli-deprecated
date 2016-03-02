export function bracketTracker(line: string): number {
  let l = (line.match(/\(/g) || []).length;
  let r = (line.match(/\)/g) || []).length;
  return l - r;
}

export function trimLineBreaks(text: string): string {
  if (text.match(/^\s+|\s+$/)) {
    text = text.replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
  }
  return text;
}

export function trimArray(text: string): string[] {
  let array: string[] = text.slice(1, -1).match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g) || [];
  return array.map(function(item) {
    return trimQuotes(trimLineBreaks(item), true);
  });
}

let quotes = ['\'', '"'];

export function trimQuotes(text: string, quotesOnly?: boolean): string {
  if (!!text.match(/^[\r\n]/)) {
    return text;
  } else if (!!text.match(/^\s/)) {
    return trimQuotes(text.slice(1), quotesOnly);
  } else if (!!text.match(/\s$/)) {
    // trim trailing spaces
    return trimQuotes(text.slice(0, text.length - 1), quotesOnly);
  } else if (quotes.indexOf(text.charAt(0)) > -1 &&
    quotes.indexOf(text.charAt(text.length - 1)) > -1) {
    // trim quotes
    return trimQuotes(text.slice(1, text.length - 1), quotesOnly);
  } else if (!quotesOnly &&
    !!text.match(/^`{3}.+`{3}$/m)) {
    // trim ``` ```
    return trimQuotes(text.slice(3, text.length - 3), quotesOnly);
  } else if (!quotesOnly &&
    text.charAt(0) === '`' &&
    text.charAt(text.length - 1) === '`') {
    // trim string literals
    return trimQuotes(text.slice(1, text.length - 1), quotesOnly);
  } else {
    return text;
  }
}

export function trimLeadingSpaces(text: string): string {
  if (!!text.match(/^\s/)) {
    return text.slice(1);
  } else {
    return text;
  }
}

export function trimCommandValue(text: string): string {
  let value = text.substring(text.indexOf('(') + 1).slice(0, -1);
  let command = {
    action: text.substring(0, text.indexOf('(')),
    value: trimLeadingSpaces(trimQuotes(value))
  };
  return command.action + '(\'' + command.value + '\')';
}

export function trimValue(text: string): string {
  let value = text.substring(text.indexOf('(') + 1).slice(0, -1);
  return trimLeadingSpaces(trimQuotes(value, true));
}

export function cleanup(result: CR.Output): string {
  result = JSON.parse(JSON.stringify(result));
  if (result.project.description) {
    result.project.description = trimLineBreaks(result.project.description);
  }
  if (result.chapters) {
    result.chapters.map((chapter) => {
      if (chapter.description) {
        chapter.description = trimLineBreaks(chapter.description);
      }
      if (chapter.pages) {
        chapter.pages.map((page) => {
          if (page.description) {
            page.description = trimLineBreaks(page.description);
          }
          if (page.tasks) {
            page.tasks.map((task) => {
              if (task.description) {
                task.description = trimLineBreaks(task.description);
              }
            });
          }
        });
      }
    });
  }
  return JSON.stringify(result, null, 2);
}
