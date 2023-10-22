import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

@customElement("navbar-component")
export class NavbarComponent extends LitElement {
  @property({ type: Boolean })
  is_logged_in: boolean | undefined;

  private changeLoginStatus = () => {
    this.dispatchEvent(
      new CustomEvent("login-status-changed", {
        detail: { is_logged_in: !this.is_logged_in },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleChangePage = (e: Event) => {
    const target = e.target as HTMLDivElement;
    console.log("handleChnagePage: ", target.dataset.nav);
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { new_page: target.dataset.nav },
        cancelable: true,
        composed: true,
      })
    );
  };

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
    }
  `;

  render() {
    return html`
      <div data-nav="tickets-page" @click="${this.handleChangePage}">
        Tickets
      </div>
      <div data-nav="profile-page" @click="${this.handleChangePage}">
        Profile
      </div>
      ${when(this.is_logged_in, 
        () => html`<div @click="${this.changeLoginStatus}">Logout</div>`
      )}  
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "navbar-component": NavbarComponent;
  }
}
