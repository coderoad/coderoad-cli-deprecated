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


describe('@action', function() {

  it('should take a single-line action in double quotes', function() {
    var lines = ['+ Task One', '', '@action(do("something"))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      actions: [
        "do('something')"
      ],
      description: 'Task One\n'
    });
  });

  it('should take a single-line action in single quotes', function() {
    var lines = ['+ Task One', '', "@action(do('something'))"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('something')"
      ]
    });
  });

  it('should take a single-line action as a string literals', function() {
    var lines = ['+ Task One', '', '@action(do(`var a`))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a')"
      ]
    });
  });

  it('should take a single-line action as a code block', function() {
    var lines = ['+ Task One', '', '@action(do(```var a```))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a')"
      ]
    });
  });

  it('shouldn\'t add actions within code blocks', function() {
    var lines = ['+ Task One', '', "@action(do(```@action(do('something else'))```))"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('@action(do('something else'))')"
      ]
    });
  });

  it('should take an array of task actions', function() {
    var lines = ['+ Task One', '', "@action([\"insert('some text')\", \"insert('more text')\"])"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "insert('some text')",
        "insert('more text')"
      ]
    });
  });

  it('should trim leading spaces from a task action', function() {
    var lines = ['+ Task One', '', "@action(do(     ```var a = 42;```))"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;')"
      ]
    });
  });

  it('should maintain line breaks in code blocks with ```', function() {
    var lines = ['+ Task One', '', "@action(do(```function () {\n return true;\n}\n```))"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('function () {\n return true;\n}')"
      ]
    });
  });

  it('should maintain line breaks in code blocks with string literals', function() {
    var lines = ['+ Task One', '', "@action(do(`function () {\n return true;\n}`))"];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('function () {\n return true;\n}')"
      ]
    });
  });

  it('should handle multiline code blocks', function() {
    var lines = ['+ Task One', '', '@action(do(', '```', 'var a = 42;', '```', '))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;\n')"
      ]
    });
  });

  it('should handle multiline string literals', function() {
    var lines = ['+ Task One', '', '@action(do(', '`', 'var a = 42;', '`', '))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;\n')"
      ]
    });
  });

  it('should treat empty spaces in code blocks as line breaks', function() {
    var lines = ['+ Task One', '', '@action(do(', '```', '', 'var a = 42;', '', '```))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('\nvar a = 42;\n\n')"
      ]
    });
  });

  it('should treat empty spaces in string literals as line breaks', function() {
    var lines = ['+ Task One', '', '@action(do(', '`', '', 'var a = 42;', '', '`))'];
    var next = task(result(), lines, index());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('\nvar a = 42;\n\n')"
      ]
    });
  });

}); // @action
