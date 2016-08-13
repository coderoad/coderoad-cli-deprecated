const expect = require('chai').expect;
const { trimQuotes, trimLineBreaks, trimArray } = require('../lib/build/parser/cleanup');

describe('trimArray', () => {

  it('should trim an array', () => {
    const test = "['hint 1', 'hint 2']";
    expect(trimArray(test)).to.deep.equal([
      'hint 1',
      'hint 2'
    ]);
  });

  it('should trim an array of string literals', () => {
    const test = "['`var a = 42;`', '`var b = 12;`']"
    expect(trimArray(test)).to.deep.equal([
      '`var a = 42;`',
      '`var b = 12;`'
    ]);
  });
});

describe('trimQuotes', () => {

  it('should remove leading spaces', () => {
    const test = '   a';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove trailing spaces', () => {
    const test = 'a   ';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove string literals', () => {
    const test = '`a`';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove code blocks', () => {
    const test = '```a```';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove double quotes', () => {
    const test = '"a"';
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should remove single quotes', () => {
    const test = "'a'";
    expect(trimQuotes(test)).to.equal('a');
  });

  it('should trim multi-line code blocks', () => {
    const test = '```function () {\n var a = 42;\n}\n```';
    expect(trimQuotes(test)).to.equal('function () {\n var a = 42;\n}');
  });

  it('should trim multi-line string literals', () => {
    const test = '`function () {\n var a = 42;\n}\n`';
    expect(trimQuotes(test)).to.equal('function () {\n var a = 42;\n}');
  });

  it('should return a line break', () => {
    const test = '\'\n\'';
    expect(trimQuotes(test)).to.equal('\n');
  });

  it('should handle mutiple line breaks', () => {
    const test = 'function () {\n return;\n\n}';
    expect(trimQuotes(test)).to.equal(test);
  });

});

describe('trimLineBreaks', () => {

  it('should trim line breaks from the end of a line', () => {
    var line = 'test\n\n';
    expect(trimLineBreaks(line)).to.equal('test');
  });

  it('should trim line breaks from the start of a line', () => {
    var line = '\n\ntest';
    expect(trimLineBreaks(line)).to.equal('test');
  });

  it('should trim line breaks from the start and end of a line', () => {
    var line = '\n\ntest\n\n';
    expect(trimLineBreaks(line)).to.equal('test');
  });

});
