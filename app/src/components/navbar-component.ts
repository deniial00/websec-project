import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('navbar-component')
export class NavbarComponent extends LitElement {

	@property({ type: Boolean })
	is_logged_in: boolean | undefined;

	private _change_login_status = () => {
		this.dispatchEvent(new CustomEvent('login-status-changed', {
			detail: { is_logged_in: !this.is_logged_in },
			bubbles: true,
			composed: true,
			}));
	}

	private _handleChangePage(e: Event) {
		// funkt nd - aber so hätt ichs ma vorgestellt. dann in app auf das event listenen
		//const pageEvent = new CustomEvent('changed-page',{ {currentPage: 'test'}, composed: true, cancelable: true });
		//this.dispatchEvent(pageEvent);
	}

	static styles = css`
		:host {
			display: flex;	/* horizontal alignment */
			justify-content: flex-end;	/* horizontal alignment */
			height: 3.5em;
			background-color: rgb(36, 36, 36);
			color: white;
		}

		:host div {
			display: flex;	/* display items next to each other */
			align-items: center;	/* vertical alignment of divs in parent */
			margin-left: 0.2em;
			margin-right: 0.2em;
		}
	`;

	render() {
		return html`
			<div @click="${this._handleChangePage}">Tickets</div>
			<div @click="${this._handleChangePage}">Profile</div>
			${this.is_logged_in ? html`
				<div @click="${this._handleChangePage}">Logout</div>
			`: html``}
			`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'navbar-component': NavbarComponent
	}
}