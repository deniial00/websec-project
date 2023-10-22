import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js';

import { Ticket } from '../interfaces/ticket-interface'


@customElement('ticket-list')
export class TicketList extends LitElement {

	@property({type: Array})
	tickets!: Ticket[];

	constructor() {
		super();
	}

	handleTicketClick(e: Event) {
		const target = e.currentTarget as HTMLDivElement;
		this.dispatchEvent(
			new CustomEvent('active-ticket-changed',{
				detail: { activeTicket: target.dataset.uuid },
				cancelable: true,
				composed: true,
			})
		);
	}

	render() {
		if (!this.tickets) {
			return html`<div>Keine Tickets verfügbar</div>`;
		}

		return html`
			<div>Deine Tickets</div>
			${map(this.tickets, ticket => 
				html`
				<div 
					class="ticket-list-element"
					@click="${this.handleTicketClick}"
					data-uuid="${ticket.uuid}"
					role="button"
				>
					<div>${ticket.title}</div>
					<div>${ticket.author.name}</div>
				</div>`
			)}
		`
	}

	static styles = css`
		.ticket-list-element {
			background-color: grey;
			border-color: lightgray;
			border-radius: 0.3em;
			margin: 0.5em 0 0.5em 0;
			padding: 0.5em;
			cursor: pointer;
		}
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-list': TicketList
	}
}