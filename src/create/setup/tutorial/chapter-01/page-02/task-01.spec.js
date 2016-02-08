var expect = require('chai').expect;
var context = require('test-context');
context('../../../example.js');

describe('divideOne', function() {

  it('doesn\'t exist', function () {
    expect(divideOne).to.not.be.undefined;
  });

  it('doesn\'t take any parameters', function() {
    expect(divideOne.length).to.be.above(0);
  });

  it('doesn\'t output a number', function () {
    expect(divideOne(1)).to.be.a('number');
  });

  it('returns the same number', function() {
    expect(divideOne(1)).to.equal(1);
    expect(divideOne(10)).to.equal(10);
  });

});
