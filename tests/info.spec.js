var chai = require('chai');
var build = function(filePath) {
  //
};

describe('info', function() {

  var result = build('./info-sample.md');
  var resultWithoutSpaces = build('./info-sample-2.md');
  var expected = require('./info-sample.json');

  describe('project info', function() {

    it('converts `#` to project info', function() {
      expect(result.project.title).to.equal(expected.project.title);
      expect(resultWithoutSpaces.project.title).to.equal(expected.project.title);
    });

    it('converts the following line to project info description', function() {
      expect(result.project.description).to.equal(expected.project.description);
      expect(resultWithoutSpaces.project.description).to.equal(expected.project.description);
    });

  });

  describe('chapter info', function() {

    it('converts `##` to chapter info', function() {
      expect(result.project.description).to.equal(expected.project.description);
      expect(resultWithoutSpaces.project.description).to.equal(expected.project.description);
    });

    it('converts the following line to chapter info description', function() {
      expect(result.chapters[0].description).to.equal(expected.chapters[0].description);
      expect(resultWithoutSpaces.chapters[0].description).to.equal(expected.chapters[0].description);
    });

  });

  describe('page info', function() {

    it('converts `###` to page info', function() {
      expect(result.chapters[0].pages[0].title).to.equal(expected.chapters[0].pages[0].title);
      expect(resultWithoutSpaces.chapters[0].pages[0].title).to.equal(expected.chapters[0].pages[0].title);
    });

    it('converts the following line to page info description', function() {
      expect(result.chapters[0].pages[0].description).to.equal(expected.chapters[0].pages[0].description);
      expect(resultWithoutSpaces.chapters[0].pages[0].description).to.equal(expected.chapters[0].pages[0].description);
    });

  });

});
