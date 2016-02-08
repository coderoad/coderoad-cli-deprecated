var expect = require('chai').expect;
var context = require('test-context');
var filePath = '../../../example.js';
context(filePath);

describe('addOne', function() {

  it('doesn\'t exist', function() {
    expect(addOne).to.not.be.undefined;
  });

  it('doesn\'t take any parameters', function() {
    expect(addOne.length).to.be.above(0);
  });

  it('doesn\'t return anything', function() {
    expect(addOne(1)).to.exist;
  });

  it('doesn\'t output a number', function() {
    expect(addOne(1)).to.be.a('number');
  });

  it('doesn\'t add 1 + 1', function() {
    expect(addOne(1)).to.equal(2);
    expect(addOne(10)).to.equal(11);
  });

});
