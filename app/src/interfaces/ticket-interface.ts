interface Ticket {
	_id?: string
	author: {
		name: string | undefined;
		uuid: string;
	},
	creationDate: Date;
	title: string;
	content: string;
	uuid: string;
	status: string;
}

export type { Ticket };