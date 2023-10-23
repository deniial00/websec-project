import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { provide } from '@lit/context';
import { sessionContext, Session } from '../contexts/auth-context';


import '../components/navbar-component'
import './tickets-page'
import './profile-page'
import './signup-page'
import './login-page'
import { choose } from 'lit/directives/choose.js';


@customElement('app-page')
export class App extends LitElement {
	constructor() {
		super();
		this.selectedPage = 'login-page';
		// this.selected_page = this.auth_context.isLoggedIn ? this.available_pages["tickets-page"] : this.available_pages["login-page"];
	}


	@provide({context: sessionContext})
	private auth_context: Session = {
		uuid: '',
		isLoggedIn: false,
		username: undefined,
		token: undefined
	}

	// @property({type: Array})
	// available_pages: Record<string, TemplateResult> = {
	// 	"signup-page": html `<signup-page @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></signup-page>`,
	// 	"login-page": html `<login-page  @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></login-page>`,
	// 	"tickets-page": html `<tickets-page></tickets-page>`,
	// 	"profile-page": html `<profile-page></profile-page>`,
	// };

	// @property({ type: Object })
	// selected_page;
	
	@property({ type: String })
	selectedPage = "login-page";

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
		this.auth_context.isLoggedIn = event.detail.is_logged_in;
		this.requestUpdate();
	}

	private onPageChanged(event: { detail: { new_page: string } }) {
		// this.selected_page = this.available_pages[event.detail.new_page];
		this.selectedPage = event.detail.new_page;
		console.log(event.detail.new_page, this.selectedPage);
		// this.requestUpdate();
	}


	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		const token = sessionStorage.getItem("token");
		if (token) {
			this.auth_context.isLoggedIn = true;
			await this.updateComplete;
			this.selectedPage = 'tickets-page';
		}
		this.requestUpdate();
	}


	render() {
		return html`
			<header>
				<navbar-component
					@login-status-changed="${this.onLoginStatusChanged}"
					@page-changed="${this.onPageChanged}"
				></navbar-component>
			</header>
			<div class="main-content">
				<!-- ${html `${this.selectedPage}`} -->
				${choose(this.selectedPage, [
					['tickets-page', () => html`<tickets-page @page-changed="${this.onPageChanged}"></tickets-page>`],
					['profile-page', () => html`<profile-page></profile-page>`],
					['login-page', () => html`<login-page  @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></login-page>`],
					['signup-page', () => html `<signup-page @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></signup-page>`]
				],
				() => html`<h1>Error</h1>`)}
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}