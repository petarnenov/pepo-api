import { users } from './data';

export const deleteAllUsers = (): boolean => {
	users.splice(0, users.length);
	return users.length === 0;
};
