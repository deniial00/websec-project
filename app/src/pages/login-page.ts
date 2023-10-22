import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { consume } from '@lit/context';
import { authContext } from '../contexts/auth-context';

@customElement('login-page')
export class LoginPage extends LitElement {

	@consume({ context: authContext, subscribe: true })
	is_logged_in: boolean | undefined;

	static styles = css`
	:host {
		color: black;
	}

	:host div {
	}

	.signup_link {
		cursor: pointer;
		color: darkblue;
		text-decoration: underline;
	}
	`

	private _changeLoginStatus = () => {
		this.dispatchEvent(new CustomEvent('login-status-changed', {
			detail: { is_logged_in: !this.is_logged_in },
			bubbles: true,
			composed: true,
		}));
	}

	private _handleChangePage = (new_page: String) => {
		this.dispatchEvent(new CustomEvent('page-changed', {
			detail: { new_page: new_page },
			cancelable: true,
			composed: true,
		}));
	}

	private _login = () => {
		//hier request ans backend schicken
			//-> wenn erfolgreich
			this._changeLoginStatus();
			this._handleChangePage("tickets-page");
			//-> wenn nicht
			//error
	}

	render() {
		return html`
			<div class="login-form">
				<form>
					<h1>Login</h1>
					<div>
						<div>
							<input type="email" placeholder="Email" autocomplete="nope">
						</div>
						<div>
							<input type="password" placeholder="Password" autocomplete="new-password">
						</div>
						Not a member? <span class="signup_link" @click=${() => {this._handleChangePage("signup-page");}}>Sign up</span>
					</div>
					<div>
						<button @click=${this._login}>Login</button>
					</div>
				</form>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'login-page': LoginPage
	}
}