import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { consume } from '@lit/context';
import { authContext } from '../contexts/auth-context';

@customElement("navbar-component")
export class NavbarComponent extends LitElement {

  @consume({ context: authContext, subscribe: true })
	is_logged_in: boolean | undefined;

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

  static styles = css`
    :host {
      display: flex; /* horizontal alignment */
      justify-content: flex-end; /* horizontal alignment */
      height: 3.5em;
      background-color: rgb(36, 36, 36);
      color: white;
    }

    :host div {
      display: flex; /* display items next to each other */
      align-items: center; /* vertical alignment of divs in parent */
      margin-left: 0.2em;
      margin-right: 0.2em;
      cursor: pointer; /* damit es wie ein link wirkt */
    }
  `;

  render() {
		return html`
			<div @click="${() => {this._handleChangePage("tickets-page");}}">Tickets</div>
			<div @click="${() => {this._handleChangePage("profile-page");}}">Profile</div>
			${when(this.is_logged_in, 
        () => html`<div @click="${() => {this._handleChangePage("login-page"); this._changeLoginStatus();}}">Logout</div>`
        )
      }
    `
	}
}



declare global {
  interface HTMLElementTagNameMap {
    "navbar-component": NavbarComponent;
  }
}
