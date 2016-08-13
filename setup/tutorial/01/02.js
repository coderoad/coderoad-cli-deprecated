describe('02 subtractOne', () => {

  const subtractOne = page.__get__('subtractOne');

  it('doesn\t exist', () => {
		expect(subtractOne).to.not.be.undefined;
	});

  it('should take a parameter', () => {
    expect(subtractOne).to.have.length(1);
  });

  it('should output a number', () => {
    expect(subtractOne(1)).to.be.a('number');
  });

  it('doesn\'t subtract 1', () => {
    expect(subtractOne(1)).to.equal(0);
    expect(subtractOne(10)).to.equal(9);
  });

});
