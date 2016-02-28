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

describe('trimCommandValue', function () {

  it('should not effect a normal command', function () {
    expect(trim("do('something')")).to.equal("do('something')");
  });

  it('should trim leading spaces', function () {
    expect(trim("do(    'something')")).to.equal("do('something')");
  });

});

describe('task', function() {

  it('should return a trimmed task description', function() {
    var lines = ['+ Task One'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One');
  });

  it('should return a multi-line task description', function() {
    var lines = ['+ Task One', 'with more on the next', 'line'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next\nline');
  });

  it('exits on next chapter', function() {
    var lines = ['+ Task One', 'with more on the next', '## Chapter Two'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  it('exits on next page', function() {
    var lines = ['+ Task One', 'with more on the next', '### Page Two'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  it('exits on next task', function() {
    var lines = ['+ Task One', 'with more on the next', '+ Task Two'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next');
  });

  it('should import lines in task', function() {
    var lines = ['+ Task description', '', "@import('./test/imports/chapter-sample')"]
    var next = task(result(), lines, index());
    var nextChapter = next.chapters[1];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

  it('should accept multpile import lines in task', function() {
    var lines = ['+ Task description', '',
    "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"]
    var next = task(result(), lines, index());
    var nextChapter = next.chapters[2];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

    it('should add codeblock languages', function() {
      var lines = ['+ Task One', '```js', 'var a = 42;', '```'];
      var next = task(result(), lines, index());
      var nextTask = next.chapters[0].pages[0].tasks[0];
      expect(nextTask.description).to.equal('Task One\n```js\nvar a = 42;\n```');
    });

    it('should add single line codeblocks', function () {
      var lines = ['+ Task One', '```var a = 42;```'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\n```var a = 42;```');
    });

    it('should handle strangely formatted codeblocks', function () {
      var lines = ['+ Task One', '```var a = 42;', '```'];
      var next = task(result(), lines, index());
      var nextTask = next.chapters[0].pages[0].tasks[0];
      expect(nextTask.description).to.equal('Task One\n```var a = 42;\n```');
    });

}); // task
