import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { consume } from '@lit/context';
import { authContext } from '../contexts/auth-context';

@customElement('signup-page')
export class SignupPage extends LitElement {

	@consume({ context: authContext, subscribe: true })
	is_logged_in: boolean | undefined;

	static styles = css`
	:host {
		color: black;
	}

	:host div {
	}

	.login_link {
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

	private _signup = () => {
		//hier request ans backend schicken
			//-> wenn erfolgreich
			this._changeLoginStatus();
			this._handleChangePage("tickets-page");
			//-> wenn nicht
			//error
	}

	render() {
		return html`
		<div class="signup-form">
			<form>
				<h1>Sign up</h1>
				<div class="content">
					<div class="input-field">
						<input type="email" placeholder="Email" autocomplete="nope">
					</div>
					<div class="input-field">
						<input type="password" placeholder="Password" autocomplete="new-password">
					</div>
					<div class="input-field">
						<input type="password" placeholder="Confirm Password" autocomplete="new-password">
					</div>
					Already have an Account? <span class="login_link" @click=${() => {this._handleChangePage("login-page");}}>Login</span>
					</div>
				<div class="action">
					<button @click=${this._signup}>Sign up</button>
				</div>
			</form>
		</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'signup-page': SignupPage
	}
}