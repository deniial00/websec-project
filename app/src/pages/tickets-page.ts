import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { Ticket } from '../interfaces/ticket-interface'

import '../components/ticket-detail-component';
import '../components/ticket-list-component';

@customElement('tickets-page')
export class TicketsPage extends LitElement {

	@property({type: Array})
	tickets: Ticket[] = [];

	@property({type: Object})
	activeTicket: Ticket | undefined;

	userId: string;

	constructor() {
		super()
		this.fetchTickets();
		this.userId = '1';
	}

	private async fetchTickets() {
		const response = await fetch('http://localhost/api/tickets');
		const json = await response.json();

		if (!json || json === undefined)
			throw Error(`Ticket nicht gefunden`);

		try {
			this.tickets = await response.json() as Ticket[];
		} catch(e) {
			
		}
	}

	handleActiveTicketChanged(e: { detail: { activeTicket: string} }) {
		const uuid = e.detail.activeTicket;
		this.activeTicket = this.tickets.find( ticket => ticket.uuid === uuid);
		console.log(this.activeTicket);
	}

	render() {
		return html`
			<ticket-list 
				.tickets='${this.tickets}'
				@active-ticket-changed="${this.handleActiveTicketChanged}"
			></ticket-list>
			<ticket-detail .ticket='${this.activeTicket}'></ticket-detail>
		`
	}

	static styles = css`
		:host {
			display: flex;
			flex-direction: row;
		}
		:host > * {
			flex: 1; // gleiche breite
			margin: 0.5em;
			padding: 0.5em;
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'tickets-page': TicketsPage
	}
}