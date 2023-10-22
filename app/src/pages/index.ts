import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { provide } from '@lit/context';
import { authContext } from '../contexts/auth-context';


import '../components/navbar-component'
import './tickets-page'
import './profile-page'
import './signup-page'
import './login-page'


@customElement('app-page')
export class App extends LitElement {

	@provide({ context: authContext })
	is_logged_in = false;

	@property({type: Array})
	available_pages: Record<string, TemplateResult> = {
		"signup-page": html `<signup-page @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></signup-page>`,
		"login-page": html `<login-page  @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></login-page>`,
		"tickets-page": html `<tickets-page></tickets-page>`,
		"profile-page": html `<profile-page></profile-page>`,
	};

	@property({ type: String })
	selected_page  = this.is_logged_in ? this.available_pages["tickets-page"] : this.available_pages["login-page"];

	static styles = css`
		:host {
			min-height: 100vh;
			margin: 0;
			display: flex;
			flex-direction: column;
		}

		.main_content {
			flex-grow: 1;
		}
	`

	private onLoginStatusChanged(event: { detail: { is_logged_in: boolean } }) {
		this.is_logged_in = event.detail.is_logged_in;
		this.requestUpdate();
	}

	private onPageChanged(event: { detail: { new_page: string } }) {
		this.selected_page = this.available_pages[event.detail.new_page];
		this.requestUpdate();
	}


	render() {
		return html`
			<header>
				<navbar-component  @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"
				></navbar-component>
			</header>
			<div class="main-content">
				${html `${this.selected_page}`}
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}