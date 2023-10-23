import { consume } from '@lit/context';
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sessionContext, Session } from '../contexts/auth-context';

@customElement('ticket-form')
export class TicketForm extends LitElement {

	@property({type: Object})
	createTicket: Function | undefined;

	@consume({ context: sessionContext, subscribe: true })
	session : Session | undefined;

	private _handleFormClick(e: Event) {
		e.preventDefault();
		const form = new FormData(e.currentTarget as HTMLFormElement);
		
		this.dispatchEvent(new CustomEvent('create-ticket',{ 
				detail: { form },
				cancelable: true,
				composed: true,
			})
		);
	}

	render() {
		return html`
			<form @submit="${this._handleFormClick}">
				<label for="title">Überschrift</label>
				<input name="title" required/>
				<label for="content">Problembeschreibung</label>
				<textarea  name="content" required>
				</textarea>
				<button  type="submit">Ticket erstellen</button>
			</form>
		`
	}

	static styles = css`
		:host {
			background-color: grey;
			border-color: lightgray;
			border-radius: 0.3em;
			margin: 0.5em;
			padding: 0.5em;
		}

		form {
			display: flex;
			flex-direction: column
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-form': TicketForm
	}
}