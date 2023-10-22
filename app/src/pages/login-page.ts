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

	private _login = async () => {
		try {
			const usernameInput = this.shadowRoot?.getElementById('username') as HTMLInputElement;
			const passwordInput = this.shadowRoot?.getElementById('password') as HTMLInputElement;
			const username = usernameInput.value;
			const password = passwordInput.value;
		
			const data = { username, password };
		
			const response = await fetch('http://localhost:8000/api/login', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ data }),
			});
			const responseBody = await response.json();
			if (response.ok) {
				console.log(responseBody.status);
			  this._changeLoginStatus();
			  this._handleChangePage("tickets-page");
			} else {
			  // TODO: Handle errors
			  console.log(response.status);
			  console.error('Login request failed');
			}
		  } catch (error) {
			console.error('Error in _signup:', error);
		  }
	}

	render() {
		return html`
			<div class="login-form">
				<form>
					<h1>Login</h1>
					<div>
						<div>
							<input id="username" type="text" placeholder="Username" autocomplete="nope">
						</div>
						<div>
							<input id="password" type="password" placeholder="Password" autocomplete="new-password">
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