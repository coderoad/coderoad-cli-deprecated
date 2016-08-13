const { expect } = require('chai');
const { page } = require('../lib/build/parser/page');

describe('page', () => {

  const result = () => ({
    pages: []
  });

  const index = () => ({
    page: -1,
    task: -1,
  });

  it('should return a trimmed page title', () => {
    const lines = ['## Page One'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage.title).to.equal('Page One');
  });

  it('should return a page description', () => {
    const lines = ['## Page One', 'page description'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should return a multi-line page description', () => {
    const lines = ['## Page One', 'page description', 'more page description'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description'
    });
  });

  it('should allow code blocks in the page description', () => {
    const lines = ['## Page One', 'page description', '`const a = 42;`'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\n`const a = 42;`'
    });
  });


  it('should allow code blocks in the page description', () => {
    const lines = ['## Page One', 'page description', '```', 'const a = 12;', '```'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\n```\nconst a = 12;\n```'
    });
  });

  it('should add codeblock languages', () => {
    const lines = ['## Page Title', 'code block', '```js', 'const a = 42;', '```', 'end code block'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage.description).to.equal('code block\n```js\nconst a = 42;\n```\nend code block');
  });

  it('should add single line codeblocks', () => {
    const lines = ['## Page Title', 'code block', '```const a = 42;```', 'end code block'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage.description).to.equal('code block\n```const a = 42;```\nend code block');
  });

  it('should handle strangely formatted codeblocks', () => {
    const lines = ['## Page Title', 'code block', '```const a = 42;', '```', 'end code block'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage.description).to.equal('code block\n```const a = 42;\n```\nend code block');
  });

  it('should exit on a new chapter', () => {
    const lines = ['## Page One', 'page description', '## Chapter Two'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should exit on a new page', () => {
    const lines = ['## Page One', 'page description', '## Page Two'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should exit on a task', () => {
    const lines = ['## Page One', 'page description', '+ Task One'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description',
      tasks: [{
        description: 'Task One'
      }]
    });
  });

  // it('should import lines in page', () => {
  //   const lines = ['## Page Title', 'page description', '', "@import('./test/imports/chapter-sample')"]
  //   const next = page({ result: result(), lines, index: index() });
  //   const nextChapter = next.chapters[1];
  //   expect(nextChapter.title).to.equal('Chapter Sample');
  // });
  //
  // it('should accept multiple import lines in page', () => {
  //   const lines = ['### Page Title', 'page description', '',
  //     "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"
  //   ]
  //   const next = page({ result: result(), lines, index: index() });
  //   const nextChapter = next.chapters[2];
  //   expect(nextChapter.title).to.equal('Chapter Sample');
  // });

}); // page
