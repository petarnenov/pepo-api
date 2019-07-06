import { users } from './data';
import { User } from './user';

export const getUser = (id: string): User | null => {
	const filteredUsers = users.filter(u => u.uuid === id);
	const user = filteredUsers ? filteredUsers[0] : null;
	return user;
};
