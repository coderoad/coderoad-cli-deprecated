const expect = require('chai').expect;
const { trimQuotes, trimLineBreaks, trimArray } = require('../lib/build/parser/cleanup');

describe('trimArray', function () {

  it('should trim an array', function () {
    var test = "['hint 1', 'hint 2']";
    expect(trimArray(test)).to.deep.equal([
      'hint 1',
      'hint 2'
    ]);
  });

  it('should trim an array of string literals', function () {
    var test = "['`var a = 42;`', '`var b = 12;`']"
    expect(trimArray(test)).to.deep.equal([
      '`var a = 42;`',
      '`var b = 12;`'
    ]);
  });
});

describe('trimQuotes', function () {

  it('should remove leading spaces', function () {
    var test = '   a';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove trailing spaces', function () {
    var test = 'a   ';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove string literals', function () {
    var test = '`a`';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove code blocks', function () {
    var test = '```a```';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove double quotes', function () {
    var test = '"a"';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove single quotes', function () {
    var test = "'a'";
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should trim multi-line code blocks', function () {
    var test = '```function () {\n var a = 42;\n}\n```';
    expect(trimQuotes(test)).to.equal('function () {\n var a = 42;\n}');
  });

  it('should trim multi-line string literals', function () {
    var test = '`function () {\n var a = 42;\n}\n`';
    expect(trimQuotes(test)).to.equal('function () {\n var a = 42;\n}');
  });

  it('should return a line break', function () {
    var test = '\'\n\'';
    expect(trimQuotes(test)).to.equal('\n');
  });

  it('should handle mutiple line breaks', function () {
    var test = 'function () {\n return;\n\n}';
    expect(trimQuotes(test)).to.equal(test);
  })

});

describe('trimLineBreaks', function () {

  it('should trim line breaks from the end of a line', function () {
    var line = 'test\n\n';
    expect(trimLineBreaks(line)).to.equal('test');
  });

  it('should trim line breaks from the start of a line', function () {
    var line = '\n\ntest';
    expect(trimLineBreaks(line)).to.equal('test');
  });

  it('should trim line breaks from the start and end of a line', function () {
    var line = '\n\ntest\n\n';
    expect(trimLineBreaks(line)).to.equal('test');
  });

});
