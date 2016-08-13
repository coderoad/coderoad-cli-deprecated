const { expect } = require('chai');
const { task } = require('../lib/build/parser/task');
const trim = require('../lib/build/parser/actions').trimCommandValue;

const result = () => ({
  pages: [{
    tasks: []
  }]
});

const index = () => ({
  page: 0,
  task: -1
});

describe('@test', () => {

  it('should take a single test file', () => {
    const lines = ['+ Task One', '', "@test('path/to/test.js')"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      tests: [
        'path/to/test.js'
      ],
      description: 'Task One\n'
    });
  });

  it('should take an array of test files', () => {
    const lines = ['+ Task One', '', "@test(['path/to/test.js', 'path/to/test2.js'])"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      tests: [
        'path/to/test.js', 'path/to/test2.js'
      ],
      description: 'Task One\n'
    });
  });

}); // @test
