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

describe('@hint', function() {

  it('should take a single hint', function() {
    var lines = ['+ Task One', '', "@hint('hint 1')"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "hint 1"
      ],
      description: 'Task One\n'
    });
  });

  it('should take an array of hints', function() {
    var lines = ['+ Task One', '', "@hint(['hint 1', 'hint 2'])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "hint 1", "hint 2"
      ],
      description: 'Task One\n'
    });
  });

  xit('should take multiline arrays of hints', function() {
    var lines = ['+ Task One', '', "@hint([\n'hint1',\n 'hint 2'\n])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "hint 1", "hint 2"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with string literals', function() {
    var lines = ['+ Task One', '', "@hint(['`var a = 42;`', '`var b = 12;`'])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "`var a = 42;`", "`var b = 12;`"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with code blocks', function() {
    var lines = ['+ Task One', '', "@hint(['```jsvar a = 42;```', '```jsvar b = 12;```'])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "```jsvar a = 42;```", "```jsvar b = 12;```"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with commas inside of blocks', function() {
    var lines = ['+ Task One', '', "@hint('an object of ```{ key1: 12, key2: 42, key3: 22 }```')"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "an object of ```{ key1: 12, key2: 42, key3: 22 }```"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with a multiline codeblock hint', function() {
    var lines = ['+ Task One', '', "@hint('an object of ```\n{ key1: 12\n, key2: 42\n, key3: 22\n }```')"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "an object of ```\n{ key1: 12\n, key2: 42\n, key3: 22\n }```"
      ],
      description: 'Task One\n'
    });
  });

}); // @hint
