import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '../components/navbar-component'
import './tickets-page'

@customElement('app-page')
export class App extends LitElement {

	@property({type: String})
	activePage = 'Tickets';

	render() {
		return html`
			<navbar-component></navbar-component>
			<tickets-page></tickets-page>
			<ticket-page></ticket-page>
			<profile-page></profile-page>
		`
	}

	static styles = css`
 
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}
