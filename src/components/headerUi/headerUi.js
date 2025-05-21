import { LitElement, html } from "lit";
import "../ModalcartUi/ModalCartUi";
import cart from '../../assets/svgs/icon-cart.svg';
import avatar from '../../assets/images/image-avatar.png';
import { headerStyle } from "./headerCss";

export class HeaderUi extends LitElement {
    static get properties(){
      return {
        _modalOpen: { type: Boolean },
        _cartItems: { type: Array }
      }
    }

    constructor() {
        super();
        this._menuOpen = false;
        this._modalOpen = false;
        this._cartItems = [];
    }

    _toggleMenu() {
        this._menuOpen = !this._menuOpen;
        this.requestUpdate();
    }

    _openModal(){
      this._cartItems =  JSON.parse(localStorage.getItem('cartItems'));
      console.log(this._cartItems);
      this._modalOpen = true;
      this.requestUpdate();
    }

    
    _handleAdd() {
      
    }
  
    _handleCancel() {
      this._modalOpen = false;
    }

    render() {
      const firstItem = this._cartItems && this._cartItems.length > 0 ? this._cartItems[0] : null;

        return html`
        <header class="header-container header--theme">
          <modal-cart
            .open=${this._modalOpen}
            .image=${firstItem ? firstItem.image : ''}
            .quantity=${firstItem ? firstItem.quantity : 0}
            .totalPrice=${firstItem ? firstItem.totalPrice : 0}
            .showAddButton=${false}
            @modal-add=${this._handleAdd}
            @modal-cancel=${this._handleCancel}
          >
          <h3 slot="title">Tu carrito: </h3>
        </modal-cart>

        <div class="header">

          <div class="header__hamburger" @click=${this._toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <p class="header__title">sneakers</p>

          <ul class="header__ul ${this._menuOpen ? 'mobile-open' : ''}">
            <li>
              <a href="#collections" >
                Collections
              </a>
            </li>

            <li>
              <a href="#men" >
                Men
              </a>
            </li>
            
            <li>
              <a href="#woman" >
                Woman
              </a>
            </li>

            <li>
              <a href="#about" >
                About
              </a>
            </li>

            <li>
              <a href="#contact" >
                Contact
              </a>
            </li>

          </ul>

          <div class="header__cart-container" >
            <img class="header__cart" @click=${this._openModal} src=${cart} alt="icono del cart"/>
          </div>

          <figure class="header__avatar-container">
            <img class="header__avatar" src=${avatar} alt="avatar del usuario" />
          </figure>
        </div>

        <hr class="header__divider" />
      </header>
    `;
    }

    static get styles() {
      return headerStyle
    }
}

customElements.define('header-ui', HeaderUi);
