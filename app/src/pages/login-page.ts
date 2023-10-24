import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { consume } from '@lit/context';
import { sessionContext, Session } from '../contexts/auth-context';

@customElement('login-page')
export class LoginPage extends LitElement {
	constructor() {
		super();
		if (this.auth_context?.isLoggedIn){
			this._handleChangePage("tickets-page");
		}
	}

	@consume({ context: sessionContext, subscribe: true })
	auth_context: Session | undefined;

	static styles = css`
	:host {
		color: black;
	}

	.signup_link {
		cursor: pointer;
		color: darkblue;
		text-decoration: underline;
	}
	`

	private _changeAuthContext = (data: { uuid: string, username: string, token: string}) => {
		console.log(data);
		sessionStorage.setItem("session", JSON.stringify({...data, isLoggedIn: true}));
		this.dispatchEvent(new CustomEvent('login-status-changed', {
			detail: { 
				isLoggedIn: !this.auth_context?.isLoggedIn,
				uuid: data.uuid,
				username: data.username,
				token: data.token
			},
			bubbles: true,
			composed: true,
		}));
	}

	private _handleChangePage = (new_page: string) => {
		this.dispatchEvent(new CustomEvent('page-changed', {
			detail: { new_page: new_page },
			cancelable: true,
			composed: true,
		}));
	}

	private _login = async (e: Event) => {
		try {
			const usernameInput = this.shadowRoot?.getElementById('username') as HTMLInputElement;
			const passwordInput = this.shadowRoot?.getElementById('password') as HTMLInputElement;
			const username = usernameInput.value;
			const password = passwordInput.value;
		
			const data = { username, password };
		
			const response = await fetch('http://localhost:80/api/login', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ data }),
			});
			const responseBody = await response.json();

			console.log(responseBody.data);// {data:{}}
			if (response.ok) {
			  await this._changeAuthContext(responseBody.data);
			  await this._handleChangePage("tickets-page");
			} else {
			  // TODO: Handle errors
			  console.log(responseBody.error);
			  console.error('Login request failed');
			}
		  } catch (error) {
			console.error('Error in _login:', error);
		  }
	}

	render() {
		return html`
			<div class="login-form">
				<form>
					<h1>Login</h1>
					<div>
						<div>
							<input id="username" type="text" placeholder="Username" !autocomplete="nope">
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