import { Collection } from 'mongoose';

import db from './data-access';
import TicketModel from './schemes/ticket-schema';
import { Ticket } from './interfaces/ticket-interface';
import { Db, Document } from 'mongodb';
export default class TicketController {
    
	private db:Db;

	constructor() {
		console.log("ticket-controller: init");
		this.db = db.connection;
	  
	}

	// public GetUser(input: string): Ticket {
	// 	let ticket: Ticket = this.db.collection('tickets').findOne<Ticket>({uuid: input});
		
	// 	return ticket;
	// }

}