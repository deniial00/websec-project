import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { Ticket } from '../interfaces/ticket-interface'
import { when } from 'lit/directives/when.js';

@customElement('ticket-detail')
export class TicketDetail extends LitElement {

	// ! to turn off error for undefined ticket var
	@property({type: Object})
	ticket: Ticket | undefined;

	constructor() {
		super();
	}

	render() {
		return when(this.ticket,
			() => html`
					<div>${this.ticket!.title}</div>
					<div>${this.ticket!.author.name} am ${new Date(this.ticket!.creationDate).toLocaleDateString('de-DE')}</div>
					<div>${this.ticket!.content}</div>
			`,
			() => html`<div>Wähle ein Ticket aus</div>`
		)
		
	}

	static styles = css`
 
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-detail': TicketDetail
	}
}