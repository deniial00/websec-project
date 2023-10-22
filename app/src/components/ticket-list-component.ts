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
		console.log(this.tickets);
	}

	render() {
		return html`
			<div>Deine Tickets</div>
			${map(this.tickets, ticket => {
				html`
				<div>
					${ticket.title}
					${ticket.author.name}
				</div>`
			})}
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