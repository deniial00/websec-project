import mongoose, { Schema } from 'mongoose';

import { Ticket } from '../interfaces/ticket-interface'


const ticketSchema = new Schema({
	author: { 
		name: String,
		uuid: String
	},
  	creationDate: Date,
	title: String,
	content: String,
	uuid: String,
	status: String
});

export default mongoose.model<Ticket & mongoose.Document>('Ticket', ticketSchema);