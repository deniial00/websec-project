interface Ticket {
	author: {
		name: string;
		uuid: string;
	},
	creationDate: Date;
	title: string;
	content: string;
	uuid: string;
	status: string;
}

export type { Ticket };