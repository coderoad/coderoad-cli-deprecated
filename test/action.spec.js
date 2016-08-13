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

describe('@action', () => {

  it('should take a single-line action in double quotes', () => {
    const lines = ['+ Task One', '', '@action(do("something"))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      actions: [
        "do('something')"
      ],
      description: 'Task One\n'
    });
  });

  it('should take a single-line action in single quotes', () => {
    const lines = ['+ Task One', '', "@action(do('something'))"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('something')"
      ]
    });
  });

  it('should take a single-line action as a string literals', () => {
    const lines = ['+ Task One', '', '@action(do(`var a`))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a')"
      ]
    });
  });

  it('should take a single-line action as a code block', () => {
    const lines = ['+ Task One', '', '@action(do(```var a```))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a')"
      ]
    });
  });

  it('shouldn\'t add actions within code blocks', () => {
    const lines = ['+ Task One', '', "@action(do(```@action(do('something else'))```))"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('@action(do('something else'))')"
      ]
    });
  });

  it('should take an array of task actions', () => {
    const lines = ['+ Task One', '', "@action([\"insert('some text')\", \"insert('more text')\"])"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "insert('some text')",
        "insert('more text')"
      ]
    });
  });

  it('should trim leading spaces from a task action', () => {
    const lines = ['+ Task One', '', "@action(do(     ```var a = 42;```))"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;')"
      ]
    });
  });

  it('should maintain line breaks in code blocks with ```', () => {
    const lines = ['+ Task One', '', "@action(do(```function () {\n return true;\n}\n```))"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('function () {\n return true;\n}')"
      ]
    });
  });

  it('should maintain line breaks in code blocks with string literals', () => {
    const lines = ['+ Task One', '', "@action(do(`function () {\n return true;\n}`))"];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('function () {\n return true;\n}')"
      ]
    });
  });

  it('should handle multiline code blocks', () => {
    const lines = ['+ Task One', '', '@action(do(', '```', 'var a = 42;', '```', '))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;\n')"
      ]
    });
  });

  it('should handle multiline string literals', () => {
    const lines = ['+ Task One', '', '@action(do(', '`', 'var a = 42;', '`', '))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('var a = 42;\n')"
      ]
    });
  });

  it('should treat empty spaces in code blocks as line breaks', () => {
    const lines = ['+ Task One', '', '@action(do(', '```', '', 'var a = 42;', '', '```))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('\nvar a = 42;\n\n')"
      ]
    });
  });

  it('should treat empty spaces in string literals as line breaks', () => {
    const lines = ['+ Task One', '', '@action(do(', '`', '', 'var a = 42;', '', '`))'];
    const next = task({result: result(), lines, index: index()});
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      description: 'Task One\n',
      actions: [
        "do('\nvar a = 42;\n\n')"
      ]
    });
  });

}); // @action
