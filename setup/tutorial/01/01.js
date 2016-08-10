const expect = require('chai').expect;

const page = require('BASE/page-01.js');

describe('01 addOne', () => {

	const addOne = page.__get__('addOne');

	it('should take a parameter', () => {
		expect(addOne).to.have.length(1);
	});

	it('doesn\'t return anything', () => {
		expect(addOne(1)).to.exist;
	});

	it('should output a number', () => {
		expect(addOne(1)).to.be.a('number');
	});

	it('doesn\'t add 1 + 1', () => {
		expect(addOne(1)).to.equal(2);
		expect(addOne(10)).to.equal(11);
	});

});
