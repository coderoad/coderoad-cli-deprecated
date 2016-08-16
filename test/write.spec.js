const expect = require('chai').expect;
const task = require('../lib/build/parser/task').task;
const trim = require('../lib/build/parser/cleanup').trimCommandValue;

const result = () => ({
  pages: [{
    tasks: []
  }]
});

const index = () => ({
  page: 0,
  task: -1
});

describe('@action(write)', () => {

  it('should take a single-line action in double quotes', () => {
    const lines = ['+ Task One', '', `@action(write('{to: "file.js", content: "hello"}'))`];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      actions: [
        `write('{to: \"file.js\", content: \"hello\"}')`
      ],
      description: 'Task One\n'
    });
  });

}); // @action(write())

describe('@action(writeFromFile)', () => {

  it('should take a single-line action in double quotes', () => {
    const lines = ['+ Task One', '', `@action(writeFromFile('{to: "file.js", from: "otherFile.js"}'))`];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      actions: [
        `writeFromFile('{to: \"file.js\", from: \"otherFile.js\"}')`
      ],
      description: 'Task One\n'
    });
  });

}); // @action(writeFromFile())
