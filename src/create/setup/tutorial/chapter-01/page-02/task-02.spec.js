var expect = require('chai').expect;
var context = require('test-context');
context('../../../example.js');

describe('multiplyOne', function() {

  it('doesn\'t exist', function () {
    expect(multiplyOne).to.not.be.undefined;
  });

  it('doesn\'t take any parameters', function() {
    expect(multiplyOne.length).to.be.above(0);
  });

  it('doesn\'t output a number', function () {
    expect(multiplyOne(1)).to.be.a('number');
  });

  it('returns the multiplied number by one', function() {
    expect(multiplyOne(1)).to.equal(1);
    expect(multiplyOne(10)).to.equal(10);
  });

});
