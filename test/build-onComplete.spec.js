const { expect }  = require('chai');
const { page } = require('../lib/build/parser/page');
const { task } = require('../lib/build/parser/task');

describe('@onPageComplete', () => {

  const result = () => ({
    pages: []
  });

  const index = () => ({
    page: -1,
    task: -1
  });

  const resultTask = () => ({
    pages: [{
      title: '',
      description: '',
      tasks: []
    }]
  });

  const indexTask = () => ({
    page: 0,
    task: -1
  });

  it('should add @onPageComplete string to the page', () => {
    const lines = ['## Page One', 'page description', 'more page description', '@onPageComplete("next page")'];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onPageComplete: 'next page'
    });
  });

  it('should handle multi-line codeblocks', () => {
    const lines = ['## Page One', 'page description', 'more page description',
      '@onPageComplete("next page', '```', 'var a = 42;', '```', '")'
    ];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onPageComplete: 'next page\n```\nvar a = 42;\n```'
    });
  });

  it('should handle string literals', () => {
    const lines = ['## Page One', 'page description', 'more page description',
      '@onPageComplete("next page', '`var a = 42;`', '")'
    ];
    const next = page({ result: result(), lines, index: index() });
    const nextPage = next.pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onPageComplete: 'next page\n`var a = 42;`'
    });
  });

});
