describe('02 multiplyOne', function() {

  it('doesn\'t exist', function () {
    expect(multiplyOne).to.be.defined;
  });

  it('should take a parameter', function() {
    expect(multiplyOne).to.have.length(1);
  });

  it('should output a number', function () {
    expect(multiplyOne(1)).to.be.a('number');
  });

  it('returns the multiplied number by one', function() {
    expect(multiplyOne(1)).to.equal(1);
    expect(multiplyOne(10)).to.equal(10);
  });

});
