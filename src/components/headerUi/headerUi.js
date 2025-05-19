import { LitElement, html, css } from "lit";
import cart from '../../assets/svgs/icon-cart.svg';
import avatar from '../../assets/images/image-avatar.png';

export class HeaderUi extends LitElement {
    static get styles() {
        return css`
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        
        width: 100%;
        padding: 0 20px;
        position: relative;
      }

      .header__title {
        font-size: 2.25rem;
        font-family: "Kumbh Sans", sans-serif;
        font-weight: 700;
        margin-right: 50px;
      }
      
      .header__ul {
        display: flex;
        list-style: none;
        align-items: center;
        gap: 20px;
        margin-right: 300px;
        padding: 0;
      }

      .header__ul li {
        font-family: "Kumbh Sans", sans-serif;
        font-weight: 400;
        color: gray;
        cursor: pointer;
      }

      .header__cart-container {
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

      .header__cart {
        height: 25px;
        width: 25px;
      }

      .header__avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-left: 20px;
      }

      .header__divider {
        border: none;
        height: 1px;
        background-color: #ccc;
        margin: 10px 0;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
      }

      .header__hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        position: relative;
      }

      .header__hamburger div {
        width: 25px;
        height: 3px;
        background-color: black;
        border-radius: 2px;
      }

      @media (max-width: 768px) {
        .header__ul {
          display: none;
          position: absolute;
          top: 95px; /* debajo del hamburgues */
          left: 0;
          background: white;
          box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
          padding: 10px;
          border-radius: 8px;
          flex-direction: column;
          gap: 10px;
          z-index: 999;
          min-width: 150px;
        }

        .header__ul.mobile-open {
          display: flex;
          align-items: flex-start;
        }

        .header__hamburger {
          display: flex;
          margin-left: 40px;
        }

        .header__avatar {
          height: 40px;
          width: 40px;
          margin-left: 10px;
        }

        .header__title {
          font-size: 2.5rem;
          margin-left: 25px;
        }
      }
    `;
    }

    constructor() {
        super();
        this.menuOpen = false;
    }

    _toggleMenu() {
        this.menuOpen = !this.menuOpen;
        this.requestUpdate();
    }

    render() {
        return html`
      <header class="header-container header--theme">
        <div class="header">

          <div class="header__hamburger" @click=${this._toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <p class="header__title">sneakers</p>

          <ul class="header__ul ${this.menuOpen ? 'mobile-open' : ''}">
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <div class="header__cart-container">
            <img class="header__cart" src=${cart} />
          </div>

          <figure class="header__avatar-container">
            <img class="header__avatar" src=${avatar} />
          </figure>
        </div>

        <hr class="header__divider" />
      </header>
    `;
    }
}

customElements.define('header-ui', HeaderUi);
