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
		const target = e.target as HTMLDivElement;
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

		console.log(this.tickets);


		return html`
			<div>Deine Tickets</div>
			${map(this.tickets, ticket => 
				html`
				<div @click="${this.handleTicketClick}" data-ticket-uuid="${ticket.uuid}">
					${ticket.title}
					${ticket.author.name}
				</div>`
			)}
		`
	}

	static styles = css`
 
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-list': TicketList
	}
}