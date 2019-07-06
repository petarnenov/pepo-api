import { User } from './user';
import { users } from './data';
import { validator } from './utils/validator';

export const addUser = (user: User): boolean => {
	try {
		validator(user);
		users.push(user);
		return true;
	} catch (err) {
		return false;
	}
};
