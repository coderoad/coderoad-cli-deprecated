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

describe('@hint', () => {

  it('should take a single hint', () => {
    const lines = ['+ Task One', '', "@hint('hint 1')"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "hint 1"
      ],
      description: 'Task One\n'
    });
  });

  // it('should take an array of hints', () => {
  //   const lines = ['+ Task One', '', "@hint(['hint 1', 'hint 2'])"];
  //   const next = task({ result: result(), lines, index: index() });
  //   const nextTask = next.pages[0].tasks[0];
  //   expect(nextTask).to.deep.equal({
  //     hints: [
  //       "hint 1", "hint 2"
  //     ],
  //     description: 'Task One\n'
  //   });
  // });

  xit('should take multiline arrays of hints', () => {
    const lines = ['+ Task One', '', "@hint([\n'hint1',\n 'hint 2'\n])"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "hint 1", "hint 2"
      ],
      description: 'Task One\n'
    });
  });

  xit('should work with string literals', () => {
    const lines = ['+ Task One', '', "@hint(['`const a = 42;`', '`const b = 12;`'])"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "`const a = 42;`", "`const b = 12;`"
      ],
      description: 'Task One\n'
    });
  });

  xit('should work with code blocks', () => {
    const lines = ['+ Task One', '', "@hint(['```jsconst a = 42;```', '```jsconst b = 12;```'])"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "```jsconst a = 42;```", "```jsconst b = 12;```"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with commas inside of blocks', () => {
    const lines = ['+ Task One', '', "@hint('an object of ```{ key1: 12, key2: 42, key3: 22 }```')"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "an object of ```{ key1: 12, key2: 42, key3: 22 }```"
      ],
      description: 'Task One\n'
    });
  });

  it('should work with a multiline codeblock hint', () => {
    const lines = ['+ Task One', '', "@hint('an object of ```\n{ key1: 12\n, key2: 42\n, key3: 22\n }```')"];
    const next = task({ result: result(), lines, index: index() });
    const nextTask = next.pages[0].tasks[0];
    expect(nextTask).to.deep.equal({
      hints: [
        "an object of ```\n{ key1: 12\n, key2: 42\n, key3: 22\n }```"
      ],
      description: 'Task One\n'
    });
  });

}); // @hint
