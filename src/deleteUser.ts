import { users } from './data';

export const deleteUser = (id: string): boolean => {
	const index = users.reduce((acc, u, i) => {
		if (u.uuid === id) acc = i;
		return acc;
	}, -1);
	//console.log('index: ', index);
	if (index !== -1) users.splice(index, 1);
	return index !== -1;
};
