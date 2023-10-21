import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {literal} from 'lit/static-html.js';

import '../components/navbar-component'
import './tickets-page'
import './ticket-page'
import './profile-page'
import './login-page'

@customElement('app-page')
export class App extends LitElement {

	@property({ type: Boolean })
	is_logged_in = true;

	@property({type: Array})
	available_pages: Record<string, TemplateResult> = {
		"login-page": html `<login-page></login-page>`,
		"tickets-page": html `<tickets-page></tickets-page>`,
		"ticket-page": html `<ticket-page></ticket-page>`,
		"profile-page": html `<profile-page></profile-page>`,
	};

	@property({ type: String })
	selected_page = this.available_pages["tickets-page"];

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
				<navbar-component .is_logged_in="${this.is_logged_in}" @login-status-changed="${this.onLoginStatusChanged}" @page-changed="${this.onPageChanged}"></navbar-component>
			</header>
			<div class="main-content">
			${this.is_logged_in
				? html `${this.selected_page}`
				: html`<login-page></login-page>`
			  }
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}
