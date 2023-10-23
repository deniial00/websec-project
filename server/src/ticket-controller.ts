import { Collection } from 'mongodb';

import { Ticket } from './interfaces/ticket-interface';
import DbAccess from './data-access';

export default class TicketController {
    
	private ticketCollection: Collection;

	constructor() {
		console.log("ticket-controller: init");
		this.ticketCollection = DbAccess.collection('tickets');
	}

	public async getTicket(uuid: string): Promise<Ticket> {
		const ticket: Ticket | null = await this.ticketCollection.findOne<Ticket>({ uuid });

		if (ticket === null)
			throw Error(`Ticket mit uuid ${uuid} nicht gefunden`);

		return ticket;
	}

	public async getTickets(): Promise<Ticket[]> {
		const cursor = await this.ticketCollection.find<Ticket>({});
		const tickets = await cursor.toArray();

		if (tickets === null || tickets.length === 0)
			throw Error(`Tickets nicht gefunden`);

		return tickets;
	}

	public async createTicket(ticket: Ticket): Promise<Boolean> {
		const ret = await this.ticketCollection.insertOne(ticket);

		if (!ret.acknowledged)
			throw Error(`Ticket konnte nicht erstellt werden. data: ${JSON.stringify(ticket)}`);

		return true;
	}

}