import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js';

import { Ticket } from '../interfaces/ticket-interface'

import '../components/ticket-detail-component';
import '../components/ticket-list-component';
import '../components/ticket-form-component';
import { consume } from '@lit/context';
import { Session, sessionContext } from '../contexts/auth-context';
import defaultStyles from '../styles';

@customElement('tickets-page')
export class TicketsPage extends LitElement {

	@consume({ context: sessionContext, subscribe: true })
  	session: Session | undefined;

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
		} catch(e) {
			console.log(e);
		}

		console.log(await json, this.tickets);
	}

	private async _createTicket(e: { detail: { form: FormData } }) {

		const title = e.detail.form.get('title');
		const content = e.detail.form.get('content');

		if (this.session === undefined)
			throw Error("Keine aktive Session");

		if (title === null || content === null)
			throw Error("Titel oder Content nicht gesetzt");

		console.log(this.session);
		const ticket: Ticket = {
			author: {
				name: this.session.username,
				uuid: this.session.uuid
			},
			creationDate: new Date(),
			title: title.toString(),
			content: content.toString(),
			uuid: crypto.randomUUID(),
			status: 'open'
		};
		console.log(ticket, this.session);
		const response = await fetch('http://localhost/api/ticket', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(ticket),
		});

		await response.json();

		this._fetchTickets();
		this._handleCreateTicketClicked()
	}

	private _handleActiveTicketChanged(e: { detail: { activeTicket: string} }) {
		const uuid = e.detail.activeTicket;
		this.activeTicket = this.tickets.find( ticket => ticket.uuid === uuid);
		console.log(this.activeTicket);
	}

	private _handleCreateTicketClicked() {	
		const button = this.renderRoot.querySelector<HTMLButtonElement>("button");
		
		if (!button)
			throw Error("Button not found");

		if (this.createMode) {
			button.textContent = "Neues Ticket erstellen" 
			button.classList.remove('cancel');
		} else {
			button.textContent = "Abbrechen";
			button.classList.add('cancel');
		}

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
					@active-ticket-changed="${this._handleActiveTicketChanged}"
				></ticket-list>
				${when(!this.createMode,
					() => html`
						<ticket-detail 
							.ticket='${this.activeTicket}'
						></ticket-detail>`,
					() => html`
						<ticket-form
							@create-ticket="${this._createTicket}"
						>
						</ticket-form>`
				)}
			</main>
		`
	}

	static styles = [
		defaultStyles,
		css`
		:host {
			display: flex;
			flex-direction: column;
		}

		:host > * {
			margin: 0 1em;
		}

		main {
			display: flex;
			flex-direction: row;
			gap: 1em;
		}

		main > * {
			flex: 1; // gleiche breite
			padding: 0.5em;
		}

		button {
			border: unset;
			border: darkgray 2px solid;
			background-color: white;
			color: darkgray;
			width: 100%;
			height: 2em;
			border-radius: 5px;
			cursor: pointer;
			font-weight: bold;
			margin: 1em 0;
		}
		
		button:hover {
			filter: brightness(0.75);
			/* background-color: rgb(244,50,48); */
			color: black;
		}

		.cancel {
			background-color: rgb(254,92,92);
		}`
		
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'tickets-page': TicketsPage
	}
}