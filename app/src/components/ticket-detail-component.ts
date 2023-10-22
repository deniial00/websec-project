import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { Ticket } from '../interfaces/ticket-interface'

@customElement('ticket-detail')
export class TicketDetail extends LitElement {

	// ! to turn off error for undefined ticket var
	@property({type: Object})
	ticket!: Ticket;

	constructor() {
		super();
	}

	render() {
		return html`
			<div>${this.ticket.title}</div>
			<div>${this.ticket.author.name} am ${this.ticket.creationDate.toLocaleDateString('de-DE')}</div>
			<div>${this.ticket.content}</div>
		`
	}

	static styles = css`
 
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-detail': TicketDetail
	}
}