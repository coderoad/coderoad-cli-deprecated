var expect = require('chai').expect;

var loadJS = require('./common/loadJS').default;
loadJS('page-02.js')


describe('01 divideOne', function() {

  it('doesn\'t exist', function () {
    expect(divideOne).to.not.be.undefined;
  });

  it('should take a parameter', function() {
    expect(divideOne).to.have.length(1);
  });

  it('doesn\'t output a number', function () {
    expect(divideOne(1)).to.be.a('number');
  });

  it('returns the same number', function() {
    expect(divideOne(1)).to.equal(1);
    expect(divideOne(10)).to.equal(10);
  });

});
