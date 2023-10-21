import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '../components/navbar-component'
import './tickets-page'

@customElement('app-page')
export class App extends LitElement {

	@property({ type: Boolean })
	is_logged_in = false;

	@property({type: Array})
	available_pages = ["login-page", "tickets-page", "ticket-page", "profile-page"];

	@property({type: String})
	selected_page = "tickets-page";

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

	render() {
		return html`
			<header>
				<navbar-component .is_logged_in="${this.is_logged_in}" @login-status-changed="${this.onLoginStatusChanged}"></navbar-component>
			</header>
			<div class="main-content">
				<tickets-page></tickets-page>
				<ticket-page></ticket-page>
				<profile-page></profile-page>
			<div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-page': App
	}
}
