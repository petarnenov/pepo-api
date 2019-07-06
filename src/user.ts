export interface Name {
	firstName: string;
	lastName: string;
}

export class User {
<<<<<<< HEAD

	uuid: string;
	name: Name;git 
=======
	uuid: string;
	name: Name;
>>>>>>> f1e718daaf472852a704a3394064d88d8ba5d642
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
<<<<<<< HEAD

=======
>>>>>>> f1e718daaf472852a704a3394064d88d8ba5d642
