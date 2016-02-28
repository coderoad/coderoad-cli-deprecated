var expect = require('chai').expect;
var chapter = require('../lib/build/parser/chapter').chapter;

describe('chapter', function() {

  var result = function() {
    return {
      chapters: []
    };
  };
  var index = function() {
    return {
      chapter: -1,
      page: -1,
      task: -1
    };
  };

  it('should return a trimmed chapter title', function() {
    var lines = ['## Chapter One'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter.title).to.equal('Chapter One');
  });

  it('should return a chapter description', function() {
    var lines = ['## Chapter One', 'chapter description'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter).to.deep.equal({
      title: 'Chapter One',
      description: 'chapter description',
      pages: []
    });
  });

  it('should return a multi-line chapter description', function() {
    var lines = ['## Chapter One', 'chapter description', 'more description'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter).to.deep.equal({
      title: 'Chapter One',
      description: 'chapter description\nmore description',
      pages: []
    });
  });

  it('should exit on a new chapter', function() {
    var lines = ['## Chapter One', 'chapter description', '## Chapter Two'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter).to.deep.equal({
      title: 'Chapter One',
      description: 'chapter description',
      pages: []
    });
  });

  it('should exit on a new page', function() {
    var lines = ['## Chapter One', 'chapter description', '### Page One'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter).to.deep.equal({
      title: 'Chapter One',
      description: 'chapter description',
      pages: [{
        title: 'Page One'
      }]
    });
  });

  it('should import lines in chapter', function() {
    var lines = ['## Chapter Title', 'chapter description', '', "@import('./test/imports/chapter-sample')"]
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[1];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

  it('should accept multiple import lines in chapter', function() {
    var lines = ['## Chapter Title', 'chapter description', '', "@import('./test/imports/chapter-sample')", "@import('./test/imports/chapter-sample')"]
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[2];
    expect(nextChapter.title).to.equal('Chapter Sample');
  });

  it('should exit on a new page', function() {
    var lines = ['## Chapter One', 'chapter description', '### Page One'];
    var next = chapter(result(), lines, index());
    var nextChapter = next.chapters[0];
    expect(nextChapter).to.deep.equal({
      title: 'Chapter One',
      description: 'chapter description',
      pages: [{
        title: 'Page One'
      }]
    });
  });

    it('should allow code blocks in the page explanation', function() {
      var lines = ['## Chapter One', '```', 'var a = 42;', '```'];
      var next = chapter(result(), lines, index());
      var nextChapter = next.chapters[0];
      expect(nextChapter).to.deep.equal({
        title: 'Chapter One',
        description: '```\nvar a = 42;\n```',
        pages: []
      });
    });

    it('should add codeblock languages', function() {
        var lines = ['## Chapter One', '```js', 'var a = 42;', '```'];
        var next = chapter(result(), lines, index());
        var nextChapter = next.chapters[0];
        expect(nextChapter).to.deep.equal({
          title: 'Chapter One',
          description: '```js\nvar a = 42;\n```',
          pages: []
        });
    });

    it('should add single line codeblocks', function () {
      var lines = ['## Chapter One', '```var a = 42;```'];
      var next = chapter(result(), lines, index());
      var nextChapter = next.chapters[0];
      expect(nextChapter).to.deep.equal({
        title: 'Chapter One',
        description: '```var a = 42;```',
        pages: []
      });
    });

    it('should handle strangely formatted codeblocks', function () {
      var lines = ['## Chapter One', '```var a = 42;', '```'];
      var next = chapter(result(), lines, index());
      var nextChapter = next.chapters[0];
      expect(nextChapter).to.deep.equal({
        title: 'Chapter One',
        description: '```var a = 42;\n```',
        pages: []
      });
    });

});
