var expect = require('chai').expect;

/// load('01/data.js', true)
/// load('page-01.js')

describe('01 addOne', function() {

	it('doesn\'t exist', function() {
		expect(addOne).to.be.defined;
	});

	it('should take a parameter', function() {
		expect(addOne).to.have.length(1);
	});

	it('doesn\'t return anything', function() {
		expect(addOne(1)).to.exist;
	});

	it('should output a number', function() {
		expect(addOne(1)).to.be.a('number');
	});

	it('doesn\'t add 1 + 1', function() {
		expect(addOne(1)).to.equal(2);
		expect(addOne(10)).to.equal(11);
	});

});
