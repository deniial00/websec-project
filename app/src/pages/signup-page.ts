import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { consume } from '@lit/context';
import { AuthContextValue } from '../interfaces/auth-interface';

import { authContext } from '../contexts/auth-context';

@customElement('signup-page')
export class SignupPage extends LitElement {

	@consume({ context: authContext, subscribe: true })
	auth_context: AuthContextValue | undefined;

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
				detail: { is_logged_in: !this.auth_context?.is_logged_in },
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

	private _signup = async () => {
		try {
		  const usernameInput = this.shadowRoot?.getElementById('username') as HTMLInputElement;
		  const emailInput = this.shadowRoot?.getElementById('email') as HTMLInputElement;
		  const passwordInput = this.shadowRoot?.getElementById('password') as HTMLInputElement;
		  const username = usernameInput.value;
		  const email = emailInput.value;
		  const password = passwordInput.value;
	  
		  const data = { username, email, password};
	  
		  const response = await fetch('http://localhost:8000/api/signup', {
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
			console.error('Signup request failed');
		  }
		} catch (error) {
		  console.error('Error in _signup:', error);
		}
	  }
	  

	render() {
		return html`
		<div class="signup-form">
			<form>
				<h1>Sign up</h1>
				<div class="content">
					<div class="input-field">
						<input id="username" type="text" placeholder="Username" autocomplete="nope">
					</div>
					<div class="input-field">
						<input id="email" type="email" placeholder="Email" autocomplete="nope">
					</div>
					<div class="input-field">
						<input type="password" placeholder="Password" autocomplete="new-password">
					</div>
					<div class="input-field">
						<input id="password" type="password" placeholder="Confirm Password" autocomplete="new-password">
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