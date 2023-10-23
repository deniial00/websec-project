import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js';

import { Ticket } from '../interfaces/ticket-interface'

import '../components/ticket-detail-component';
import '../components/ticket-list-component';
import '../components/ticket-form-component';

@customElement('tickets-page')
export class TicketsPage extends LitElement {

	@property({type: Array})
	tickets: Ticket[] = [];

	@property({type: Object})
	activeTicket: Ticket | undefined;

	@property({type: Boolean})
	createMode = false;

	userId: string;

	constructor() {
		super()
		this._fetchTickets();
		this.userId = '1';
	}

	private async _fetchTickets() {
		const response = await fetch('http://localhost/api/tickets');
		const json = await response.json();

		if (!json || json === undefined)
			throw Error(`Ticket nicht gefunden`);

		try {
			const tickets = json as Ticket[];
			this.tickets = tickets;
			// this.requestUpdate();
		} catch(e) {
			console.log(e);
		}

		console.log(await json, this.tickets);
	}

	public async createTicket(ticket: Ticket) {
		const response = await fetch('http://localhost/api/ticket', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(ticket),
		});

		await response.json();

		this._fetchTickets();
	}

	handleActiveTicketChanged(e: { detail: { activeTicket: string} }) {
		const uuid = e.detail.activeTicket;
		this.activeTicket = this.tickets.find( ticket => ticket.uuid === uuid);
		console.log(this.activeTicket);
	}

	private _handleCreateTicketClicked(e: Event) {
		this.createMode = !this.createMode;
	}

	render() {
		return html`
			<div>
				<button @click="${this._handleCreateTicketClicked}">Neues Ticket erstellen</button>
			</div>
			<main>
				<ticket-list 
					.tickets='${this.tickets}'
					@active-ticket-changed="${this.handleActiveTicketChanged}"
				></ticket-list>
				${when(!this.createMode,
					() => html`
						<ticket-detail 
							.ticket='${this.activeTicket}'
						></ticket-detail>`,
					() => html`
						<ticket-form .createTicket="${this.createTicket}">
						</ticket-form>`
				)}
			</main>
		`
	}

	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
		}

		main {
			display: flex;
			flex-direction: row;
		}

		main > * {
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