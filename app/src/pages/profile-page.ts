import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('profile-page')
export class ProfilePage extends LitElement {

	@property({type: String})
	docsHint = ''

	render() {
		return html`
			<div>PROFILE</div>
		`
	}

	static styles = css`
 
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'profile-page': ProfilePage
	}
}