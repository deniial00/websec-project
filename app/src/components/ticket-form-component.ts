import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ticket-form')
export class TicketForm extends LitElement {

	@property({type: Object})
	createTicket: Function | undefined;

	private _handleFormClick(e: Event) {
		e.preventDefault();
		const form = new FormData(e.currentTarget as HTMLFormElement);
		console.log(form.getAll('title'));
	}

	render() {
		return html`
			<form @submit="${this._handleFormClick}">
				<label for="title">Überschrift</label>
				<input name="title"/>
				<label for="content">Problembeschreibung</label>
				<textarea  name="content">
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