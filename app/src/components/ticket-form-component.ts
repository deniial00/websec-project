import { consume } from '@lit/context';
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sessionContext, Session } from '../contexts/auth-context';

@customElement('ticket-form')
export class TicketForm extends LitElement {

	@property({type: Object})
	createTicket: Function | undefined;

	@consume({ context: sessionContext, subscribe: true })
	@property({attribute: false})
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

		input,textarea {
			border-radius: 5px;
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
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'ticket-form': TicketForm
	}
}