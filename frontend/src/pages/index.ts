import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('app-page')
export class App extends LitElement {

  @property({type: String})
  docsHint = ''

  @property({ type: Number })
  count = 0

  render() {
    return html`

    `
  }

  static styles = css`
 
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-page': App
  }
}
