import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { provide } from '@lit/context';
import { sessionContext, Session } from '../contexts/auth-context';
import defaultStyles from '../styles';


import '../components/navbar-component'
import './tickets-page'
import './profile-page'
import './signup-page'
import './login-page'
import { choose } from 'lit/directives/choose.js';


@customElement('app-page')
export class App extends LitElement {

	@provide({context: sessionContext})
	private session: Session | undefined;


	@property({ type: String })
	selectedPage = "login-page";

	constructor() {
		super();
		if (this.session === undefined) {
			this.session = {
				uuid: '',
				isLoggedIn: false,
				username: undefined,
				token: undefined
			};
		}
		
		this.selectedPage = 'login-page';
	}

	private onLoginStatusChanged(event: { detail: { isLoggedIn: boolean, uuid: string, username: string, token: string } }) {
		console.log(event.detail);
		this.session = event.detail;
		console.log(this.session);
		this.requestUpdate();
	}

	private onPageChanged(event: { detail: { new_page: string } }) {
		this.selectedPage = event.detail.new_page;
		console.log(event.detail.new_page, this.selectedPage);
		this.requestUpdate();
	}


	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		const string = sessionStorage.getItem("session");

		if (!string) {
			this.requestUpdate();
			return;
		}

		const session = JSON.parse(string);
		if (session && this.session) {
			this.session = session;
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
				<div>
				${choose(this.selectedPage, [
					['tickets-page', () => html`<tickets-page @page-changed="${this.onPageChanged}"></tickets-page>`],
					['profile-page', () => html`<profile-page></profile-page>`],
					['login-page', () => html`<login-page  @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></login-page>`],
					['signup-page', () => html `<signup-page @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></signup-page>`]
				],
				() => html`<h1>Error</h1>`)}
				</div>
			</div>
		`
	}

	static styles = [
		defaultStyles,
		css`
		:host {
			min-height: 100vh;
			margin: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.main-content {
			flex-grow: 1;
			width: 100%;
		}

		header {
			width: 100%;
		}`
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}