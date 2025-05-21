import { html, LitElement } from "lit";
import { footerStyles } from "./footerCss";

export class FooterUi extends LitElement {
    constructor(){
        super();
    }

    render(){
        return html`
            <footer id="contact">
                <hr class="footer__divider" />
                <h4>Contact</h4>
                <div class="contact-info">
                    Email: sebastian.gomez.salinas.contractor@bbva.com
                    Phone: +51970863286
                    Address: XXXXXXXXXX
                </div>
            </footer>
        `
    }

    static get styles(){
        return footerStyles;
    }
}

customElements.define('footer-ui', FooterUi);
