describe('02 subtractOne', function() {

  it('doesn\'t exist', function () {
    expect(subtractOne).to.be.defined;
  });

  it('should take a parameter', function() {
    expect(subtractOne).to.have.length(1);
  });

  it('should output a number', function () {
    expect(subtractOne(1)).to.be.a('number');
  });

  it('doesn\'t subtract 1', function() {
    expect(subtractOne(1)).to.equal(0);
    expect(subtractOne(10)).to.equal(9);
  });

});
