var expect = require('chai').expect;
var task = require('../lib/build/parser/task').task;
var trim = require('../lib/build/parser/actions').trimCommandValue;

var result = function() {
  return {
    chapters: [{
      pages: [{
        tasks: []
      }]
    }]
  };
};
var index = function() {
  return {
    chapter: 0,
    page: 0,
    task: -1
  };
};

describe('@test', function() {

  it('should take a single test file', function() {
    var lines = ['+ Task One', '', "@test('path/to/test.js')"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      tests: [
        "path/to/test.js"
      ],
      description: 'Task One\n'
    });
  });

  it('should take an array of test files', function() {
    var lines = ['+ Task One', '', "@test(['path/to/test.js', 'path/to/test2.js'])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      tests: [
        "path/to/test.js", "path/to/test2.js"
      ],
      description: 'Task One\n'
    });
  });

}); // @test
