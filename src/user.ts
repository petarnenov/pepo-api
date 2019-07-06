export interface Name {
	firstName: string;
	lastName: string;
}

export class User {
	uuid: string;
	name: Name;
	email: string;
	phoneNumbers: string[];
	createdAt: Date;
	constructor(
		uuid: string,
		name: Name,
		email: string,
		phoneNumbers: string[],
		createdAt: number
	) {
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.phoneNumbers = Array.from(phoneNumbers);
		this.createdAt = new Date(+createdAt * 1000);
	}
}
//
//
//