const { expect } = require('chai');

const page = require('BASE/page-02');

describe('01 divideOne', () => {

  const divideOne = page.__get__('divideOne');

  it('doesn\t exist', () => {
		expect(divideOne).to.not.be.undefined;
	});

  it('should take a parameter', () => {
    expect(divideOne).to.have.length(1);
  });

  it('doesn\'t output a number', () => {
    expect(divideOne(1)).to.be.a('number');
  });

  it('returns the same number', () => {
    expect(divideOne(1)).to.equal(1);
    expect(divideOne(10)).to.equal(10);
  });

});
