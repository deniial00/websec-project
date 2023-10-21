import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('navbar-component')
export class NavbarComponent extends LitElement {

	@property({type: String})
	docsHint = ''

	render() {
		return html`
			<div>
				<div>Login</div>
				<div>Tickets</div>
				<div>Profile</div>
				<div>Logout</div>
			</div>
		`
	}

	static styles = css`
 
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'navbar-component': NavbarComponent
	}
}