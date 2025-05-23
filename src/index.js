import { LitElement, css, html } from 'lit'
import './components/headerUi/headerUi.js'
import './components/productUi/productUi.js'
import './components/dm/product-dm/productDm.js'
import './components/footerUi/footerUi.js'

export class Index extends LitElement {
  static get properties() {
    return {
      _products: { type: Object },
      _errorMessage: { type: String }
    }
  }

  constructor() {
    super()
    this._errorMessage = '';
    this._products = {};
    this._host = "https://api.escuelajs.co/api/v1/products";
  }

  firstUpdated(){
    const productDm = this.shadowRoot.getElementById('product-dm');
    productDm.host = this._host;
    productDm.getProduct();
  };

  get _getRenderDm(){
    return html `
      <product-dm 
        id="product-dm"
        @product-dm-success="${this._handleProductDmSuccess}"
        @product-dm-error="${this._handleProductDmError}">
      </product-dm>
    `
  }

  _handleProductDmSuccess(event){
    this._products = event.detail.products;
    this._errorMessage = '';
  }

  _handleProductDmError(event){
    this._errorMessage = event.detail.message || 'Error desconocido';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll-to-contact', () => {
      const footer = this.shadowRoot.querySelector('footer-ui') || document.querySelector('footer-ui');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    });
  }

  render() {
    return html`
      <div>
        ${this._getRenderDm}

        <header-ui></header-ui>

        <product-ui
          .productId=${this._products.id}
          .images=${this._products ? this._products.images : []}
          .discount=${true}
          real-price=${this._products.price}
          >
          <h2 slot="campain-name">${this._products ? this._products.title : ''} </h2>
          <p slot="description" class="product-ui-description"> 
            ${this._products.description}
          </p>
        </product-ui>

        <footer-ui></footer-ui>

      </div>
    `
  }

  static get styles() {
    return css`
      .product-ui-description {
        color: gray;
      }
    `
  }
}

window.customElements.define('index-root', Index)
