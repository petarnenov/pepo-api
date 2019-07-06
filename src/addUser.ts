import { User } from './user';
import { users } from './data';

export const addUser = (user: User): boolean => {
	try {
		users.push(user);
		return true;
	} catch (err) {
		return false;
	}
};
