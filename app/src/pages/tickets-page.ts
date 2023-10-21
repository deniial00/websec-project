import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('tickets-page')
export class TicketsPage extends LitElement {

	@property({type: String})
	docsHint = ''

	render() {
		return html`
			<div>testy</div>
			<div>testy</div>
		`
	}

	static styles = css`
 
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'tickets-page': TicketsPage
	}
}