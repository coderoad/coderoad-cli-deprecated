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
          tasks: []
        }]
      }]
    };
  };

  it('should add a @onComplete string to the page', function() {
    var lines = ['### Page One', 'page description', 'more page description', '@onComplete("next page")'];
    var next = page(result(), lines, index());
    var nextPage = next.chapters[0].pages[0];
    expect(nextPage).to.deep.equal({
      title: 'Page One',
      description: 'page description\nmore page description',
      onComplete: 'next page'
    });

    it('shouldn\'t add a @onComplete string to a task', function() {
      var lines = ['+ Task One', 'with more on the next', 'line', '@onComplete("next page")'];
      var next = task(resultTask(), lines, index());
      var nextTask = next.chapters[0].pages[0].tasks[0];
      expect(nextTask.description).to.equal('Task One\nwith more on the next\nline');
    });
  });
});
