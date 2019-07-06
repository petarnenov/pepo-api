import { User } from '../user';

export const validator = (user: User): boolean => {
    if(user.createdAt>new Date()) throw Error("Imposible creation date")
	return true;
};
