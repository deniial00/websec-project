import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { consume } from '@lit/context';
import { sessionContext, Session } from '../contexts/auth-context';

@customElement("navbar-component")
export class NavbarComponent extends LitElement {

  @consume({ context: sessionContext, subscribe: true })
  auth_context: Session | undefined;

  private _changeLoginStatus = () => {
      sessionStorage.removeItem("session");
      this.dispatchEvent(new CustomEvent('login-status-changed', {
        detail: { is_logged_in: !this.auth_context?.isLoggedIn },
        bubbles: true,
        composed: true,
      }));
      this.requestUpdate();
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
      justify-content: space-between; /* horizontal alignment */
      height: 3.5em;
      background-color: rgb(36, 36, 36);
      color: white;
      width: 100%;
      
    }

    :host > * {
      display: flex; /* display items next to each other */
      align-items: center; /* vertical alignment of divs in parent */
      cursor: pointer; /* damit es wie ein link wirkt */
      margin: 0 2em;
      font-weight: bold;
    }

    :host > div:hover {
      color: rgb(229,77,44);
    }

    :host > img:hover {
      filter: invert(24%) sepia(91%) saturate(6565%) hue-rotate(355deg) brightness(90%) contrast(120%);
     }`;

  render() {
		return html`
      <img src="/suppord-logo.png" />
			<!-- <div @click="${() => {this._handleChangePage("profile-page");}}">Profile</div> -->
			${when(this.auth_context?.isLoggedIn, 
        () => html`
          <div @click="${() => {this._handleChangePage("tickets-page");}}">Tickets</div>
          <div @click="${() => {this._handleChangePage("login-page"); this._changeLoginStatus();}}">Logout</div>
        `
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
