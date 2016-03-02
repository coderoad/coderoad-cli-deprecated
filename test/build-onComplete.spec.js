var expect = require('chai').expect;
var page = require('../lib/build/parser/page').page;
var task = require('../lib/build/parser/task').task;

describe('@onComplete', function() {

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

  var resultTask = function() {
    return {
      chapters: [{
        pages: [{
          title: '',
          description: '',
          tasks: []
        }]
      }]
    };
  };

  var indexTask = function() {
    return {
      chapter: 0,
      page: 0,
      task: -1
    };
  };

  it('should add @onComplete string to the page', function() {
    var lines = ['### Page One', 'page description', 'more page description', '@onComplete("next page")'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onComplete: 'next page'
    });
  });

  it('should handle multi-line codeblocks', function() {
    var lines = ['### Page One', 'page description', 'more page description',
      '@onComplete("next page', '```', 'var a = 42;', '```', '")'
    ];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onComplete: 'next page\n```\nvar a = 42;\n```'
    });
  });

  it('should handle string literals', function() {
    var lines = ['### Page One', 'page description', 'more page description',
      '@onComplete("next page', '`var a = 42;`', '")'
    ];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onComplete: 'next page\n`var a = 42;`'
    });
  });

  it('shouldn\'t add to tasks', function() {
    var lines = ['+ Task One', 'with more on the next', 'line'];
    var next = task(resultTask(), lines, indexTask());
    var nextTask = next.chapters[0].pages[0].tasks[0];
    expect(nextTask.description).to.equal('Task One\nwith more on the next\nline');
  });

});
