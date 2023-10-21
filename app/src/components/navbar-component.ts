import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('navbar-component')
export class NavbarComponent extends LitElement {

	render() {
		return html`
			<div>
				<div @click="${this._handleChangePage}">Login</div>
				<div @click="${this._handleChangePage}">Tickets</div>
				<div @click="${this._handleChangePage}">Profile</div>
				<div @click="${this._handleChangePage}">Logout</div>
			</div>
		`
	}

	private _handleChangePage(e: Event) {
		// funkt nd - aber so hätt ichs ma vorgestellt. dann in app auf das event listenen
		const pageEvent = new CustomEvent('changed-page',{ {currentPage: 'test'}, composed: true, cancelable: true });
		this.dispatchEvent(pageEvent);
	}

	static styles = css`
 
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'navbar-component': NavbarComponent
	}
}