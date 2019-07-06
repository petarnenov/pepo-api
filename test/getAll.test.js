const { getAllUsers } = require('../dist/getAllUsers');

test('Blabla', () => {
	const allUsers = getAllUsers();	
	expect(allUsers.length).toBe(0);
});
