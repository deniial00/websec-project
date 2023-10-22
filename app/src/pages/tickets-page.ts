import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { Ticket } from '../interfaces/ticket-interface'

import '../components/ticket-detail-component';
import '../components/ticket-list-component';

@customElement('tickets-page')
export class TicketsPage extends LitElement {

	@property({type: Array})
	tickets: Ticket[] = [
		{
			author: {
				name: 'Daniel Hofbauer',
				uid: '9363fa7d-1f95-4098-ae62-5981906f2f10'
			},
			creationDate: new Date(),
			title: 'Test ticket',
			content: 'Reprehenderit aliquip nostrud et velit labore labore. Cupidatat nulla nisi ipsum adipisicing labore anim aliqua aute eiusmod cillum ut aute. Do elit deserunt fugiat officia aliquip sunt esse aute ut sint. Consequat velit ipsum deserunt ea eiusmod tempor laborum ut.',
			uuid: '550e8400-e29b-41d4-a716-446655440000',
			status: 'open'
		},
		{
			author: {
				name: 'Daniel Hofbauer',
				uid: 'e5a4bf0d-028a-402f-9321-f44517dc8c12'
			},
			creationDate: new Date(),
			title: 'Test ticket2',
			content: 'Laborum amet fugiat qui quis non duis sint. Ad id occaecat incididunt reprehenderit sint cupidatat fugiat in officia cupidatat deserunt cillum officia ipsum. Eu officia do deserunt voluptate eiusmod duis tempor laborum ullamco qui reprehenderit. Proident elit duis nostrud ullamco velit. Quis enim laborum commodo ipsum. Eiusmod duis reprehenderit ut mollit reprehenderit.',
			uuid: '7c7f8ef8-6a10-4f7c-a12e-84a7fffc2f94',
			status: 'open'
		}
	]

	@property({type: String})
	activeTicket = ''

	constructor() {
		super()
		this.activeTicket = this.tickets[0].uuid
	}

	// mega praktisch: wenn man das als get definiert, dann wird das beim binding nicht als function angesehen und führt dann zu keinem type mismatch (() => obj != obj)
	get getActiveTicket() : Ticket{
		const ticket = this.tickets.find( ticket => ticket.uuid === this.activeTicket)
		
		if (ticket == undefined)
			throw new Error("Ticket not found")
		
		console.log(ticket)
		return ticket
	}

	handleActiveTicketChanged(e: { detail: { activeTicket: string} }) {
		console.log(e.detail.activeTicket);
		this.activeTicket = e.detail.activeTicket;
	}

	render() {
		return html`
			<ticket-list 
				.tickets='${this.tickets}'
				@active-ticket-changed="${this.handleActiveTicketChanged}"
			></ticket-list>
			<ticket-detail .ticket='${this.getActiveTicket}'></ticket-detail>
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