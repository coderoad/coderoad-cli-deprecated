var expect = require('chai').expect;
var context = require('test-context');
context('../../../example.js');

describe('subtractOne', function() {

  it('doesn\'t exist', function () {
    expect(subtractOne).to.not.be.undefined;
  });

  it('doesn\'t take any parameters', function() {
    expect(subtractOne.length).to.be.above(0);
  });

  it('doesn\'t output a number', function () {
    expect(subtractOne(1)).to.be.a('number');
  });

  it('doesn\'t subtract 1', function() {
    expect(subtractOne(1)).to.equal(0);
    expect(subtractOne(10)).to.equal(9);
  });

});
