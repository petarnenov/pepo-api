const { getAllUsers } = require('../dist/getAllUsers');
const { addUser } = require('../dist/addUser');
const {} = require('../dist/getAllUsers');
//we use assertion library chai
//like in Postman
const { expect } = require('chai');

Date.prototype.addHour = function(h) {
	this.setTime(this.getTime() + h * 60 * 60 * 1000);
	return this;
};

describe('PEPO-API testing', () => {
	it('Empty db', () => {
		const allUsers = getAllUsers();
		expect(allUsers.length).to.be.equal(0);
	});

	it('Add user', () => {
		const isAddUser = addUser({ uuid: '1234', name: { first: 'Bla' } });
		expect(isAddUser).to.be.true;
	});

	it('Add user', () => {
		const now = new Date();
		const isAddUser = addUser({
			uuid: '1234',
			name: { first: 'Bla' },
			createdAt: now.addHour(3)
		});
		expect(isAddUser).to.be.false;
	});

	it('Show all users', () => {
		const users = getAllUsers();
		expect(users.length).to.be.equal(1);
	});
});
