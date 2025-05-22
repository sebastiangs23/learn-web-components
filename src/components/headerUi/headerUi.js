import { LitElement, html, nothing } from "lit";
import "../ModalcartUi/ModalCartUi";
import cart from '../../assets/svgs/icon-cart.svg';
import avatar from '../../assets/images/image-avatar.png';
import { headerStyle } from "./header.css";
import { header } from "../../utils/constants/constants";

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

    /*_______________________
    | Watcher LocalStorage */
    connectedCallback() {
      super.connectedCallback();
      window.addEventListener('storage', this._onStorageChange);
      window.addEventListener('cart-updated', this._onCartUpdated);
    }
    
    disconnectedCallback() {
      window.removeEventListener('storage', this._onStorageChange);
      window.removeEventListener('cart-updated', this._onCartUpdated);
      super.disconnectedCallback();
    }
    
    _onCartUpdated = () => {
      const stored = localStorage.getItem('cartItems');
      this._cartItems = stored ? JSON.parse(stored) : [];
      this.requestUpdate();
    }
    
    _onStorageChange = (event) => {
      if (event.key === 'cartItems') {
        try {
          this._cartItems = event.newValue ? JSON.parse(event.newValue) : [];
          this.requestUpdate();
        } catch (e) {
          console.error('Error parsing cartItems from storage event:', e);
        }
      }
    }
    
    firstUpdated() {
      const stored = localStorage.getItem('cartItems');
      this._cartItems = stored ? JSON.parse(stored) : [];

      const contactLink = this.shadowRoot.querySelector('a[href="#contact"]');
      if (contactLink) {
        contactLink.addEventListener('click', e => {
          e.preventDefault();
          this.dispatchEvent(new CustomEvent('scroll-to-contact', {
            bubbles: true,
            composed: true,
          }));
        });
      }
    }
    
    /*______________
    |  Hamburguesa */
    _toggleMenuHamburger() {
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

    _handleDelete() {
      if (!this._cartItems || this._cartItems.length === 0) return;
    
      // Ejemplo: eliminas el primer producto (o cambia según la lógica)
      this._cartItems.splice(0, 1);
    
      // Actualizas localStorage
      localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
    
      // Actualizas el componente y cierras modal
      this._modalOpen = false;
      this.requestUpdate();
    
      // Opcional: disparar evento para sincronizar si hay otros componentes escuchando
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
    

    render() {
      const firstItem = this._cartItems && this._cartItems.length > 0 ? this._cartItems[0] : nothing;
      const totalQuantity = this._cartItems ? this._cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0) : 0;

        return html`
        <header class="header-container header--theme">
          <modal-cart
            .modalType=${2}
            .open=${this._modalOpen}
            .image=${firstItem ? firstItem.image : 'https://placehold.co/600x400'}
            .quantity=${firstItem ? firstItem.quantity : 0}
            .totalPrice=${firstItem ? firstItem.totalPrice : 0}
            .showAddButton=${false}
            @modal-add=${this._handleAdd}
            @modal-cancel=${this._handleCancel}
            @modal-delete=${this._handleDelete}
          >
          <h3 slot="title">Tu carrito: </h3>
        </modal-cart>

        <div class="header">

          <div class="header__hamburger" @click=${this._toggleMenuHamburger}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <p class="header__title">sneakers</p>

          <ul class="header__ul ${this._menuOpen ? 'mobile-open' : ''}">
            ${header.map((item) => html` 
                  <li>
                    <a href=${item.href}> ${item.name} </a>
                  </li>
                `
            )}
          </ul> 
  
          <div class="header__cart-container" >
            <img
              class="header__cart"
              @click=${this._openModal}
              src=${cart}
              alt="icono del cart"
            />
            ${totalQuantity > 0 ? html`
              <span class="cart-badge">${totalQuantity}</span>
            ` : ''}
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
