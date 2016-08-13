describe('02 multiplyOne', () => {

  const multiplyOne = page.__get__('multiplyOne');

  it('doesn\t exist', () => {
		expect(multiplyOne).to.not.be.undefined;
	});

  it('should take a parameter', () => {
    expect(multiplyOne).to.have.length(1);
  });

  it('should output a number', () => {
    expect(multiplyOne(1)).to.be.a('number');
  });

  it('returns the multiplied number by one', () => {
    expect(multiplyOne(1)).to.equal(1);
    expect(multiplyOne(10)).to.equal(10);
  });

});
