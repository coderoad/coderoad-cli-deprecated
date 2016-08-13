const { expect } = require('chai');
const { task } = require('../lib/build/parser/task');
const { trimCommandValue } = require('../lib/build/parser/cleanup');

const result = () => ({
  pages: [{
    tasks: []
  }]
});

const index = () => ({
  page: 0,
  task: -1
});

describe('trimCommandValue', () => {

  it('should not effect a normal command', () => {
    expect(trimCommandValue("do('something')")).to.equal("do('something')");
  });

  it('should trim leading spaces', () => {
    expect(trimCommandValue("do(    'something')")).to.equal("do('something')");
  });

});

describe('task', () => {

  it('should return a trimmed task description', () => {
    const lines = ['+ Task One'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One');
  });

  it('should return a multi-line task description', () => {
    const lines = ['+ Task One', 'with more on the next', 'line'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next\nline');
  });

  it('exits on next chapter', () => {
    const lines = ['+ Task One', 'with more on the next', '## Chapter Two'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  it('exits on next page', () => {
    const lines = ['+ Task One', 'with more on the next', '## Page Two'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  it('exits on next task', () => {
    const lines = ['+ Task One', 'with more on the next', '+ Task Two'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  // it('should import lines in task', () => {
  //   const lines = ['+ Task description', '', "@import('./test/imports/chapter-sample')"]
  //   const next = task({ result: result(), lines, index: index() });
  //   const nextChapter = next.chapters[1];
  //   expect(nextChapter.title).to.equal('Chapter Sample');
  // });
  //
  // it('should accept multiple import lines in task', () => {
  //   const lines = ['+ Task description', '',
  //     "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"
  //   ]
  //   const next = task({ result: result(), lines, index: index() });
  //   const nextChapter = next.chapters[2];
  //   expect(nextChapter.title).to.equal('Chapter Sample');
  // });

  it('should add codeblock languages', () => {
    const lines = ['+ Task One', '```js', 'const a = 42;', '```'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\n```js\nconst a = 42;\n```');
  });

  it('should add single line codeblocks', () => {
    const lines = ['+ Task One', '```const a = 42;```'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\n```const a = 42;```');
  });

  it('should handle strangely formatted codeblocks', () => {
    const lines = ['+ Task One', '```const a = 42;', '```'];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\n```const a = 42;\n```');
  });

}); // task
