var expect = require('chai').expect;
var page = require('../lib/build/parser/page').page;

describe('page', function() {

  var result = function() {
    return {
      chapters: [{
        pages: []
      }]
    };
  };
  var index = function() {
    return {
      chapter: 0,
      page: -1,
      task: -1
    };
  };


  it('should return a trimmed page title', function() {
    var lines = ['### Page One'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage.title).to.equal('Page One');
  });

  it('should return a page description', function() {
    var lines = ['### Page One', 'page description'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should return a multi-line page description', function() {
    var lines = ['### Page One', 'page description', 'more page description'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description'
    });
  });

  it('should allow code blocks in the page description', function() {
    var lines = ['### Page One', 'page description', '`var a = 42;`'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\n`var a = 42;`'
    });
  });


  it('should allow code blocks in the page description', function() {
    var lines = ['### Page One', 'page description', '```', 'var a = 12;', '```'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\n```\nvar a = 12;\n```'
    });
  });

  it('should add codeblock languages', function() {
    var lines = ['### Page Title', 'code block', '```js', 'var a = 42;', '```', 'end code block'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage.description).to.equal('code block\n```js\nvar a = 42;\n```\nend code block');
  });

  it('should add single line codeblocks', function() {
    var lines = ['### Page Title', 'code block', '```var a = 42;```', 'end code block'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage.description).to.equal('code block\n```var a = 42;```\nend code block');
  });

  it('should handle strangely formatted codeblocks', function() {
    var lines = ['### Page Title', 'code block', '```var a = 42;', '```', 'end code block'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage.description).to.equal('code block\n```var a = 42;\n```\nend code block');
  });

  it('should exit on a new chapter', function() {
    var lines = ['### Page One', 'page description', '## Chapter Two'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should exit on a new page', function() {
    var lines = ['### Page One', 'page description', '### Page Two'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description'
    });
  });

  it('should exit on a task', function() {
    var lines = ['### Page One', 'page description', '+ Task One'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description',
      tasks: [{
        description: 'Task One'
      }]
    });
  });

  it('should import lines in page', function() {
    var lines = ['### Page Title', 'page description', '', "@import('./test/imports/chapter-sample')"]
    var next = page(result(), lines, index());
    var nextChapter = next.chapters[1];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

  it('should accept multiple import lines in page', function() {
    var lines = ['### Page Title', 'page description', '',
      "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"
    ]
    var next = page(result(), lines, index());
    var nextChapter = next.chapters[2];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

}); // page
