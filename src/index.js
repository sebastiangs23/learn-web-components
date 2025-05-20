import { LitElement, css, html } from 'lit'
import './components/headerUi/headerUi.js'
import './components/productUi/productUi.js'
import './components/dm/product-dm/productDm.js'

export class Index extends LitElement {
  static get properties() {
    return {
      productToRender: { type: Object },
      errorMessage: { type: String }
    }
  }

  constructor() {
    super()
    this._host = "https://api.escuelajs.co/api/v1/products/31";
    this.errorMessage = '';
    this.productToRender = {};
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
    this.productToRender = event.detail.products;
    this.errorMessage = '';
  }

  _handleProductDmError(event){
    this.errorMessage = event.detail.message || 'Error desconocido';
  }

  render() {
    return html`
      <div>
        ${this._getRenderDm}

        <header-ui></header-ui>

        <product-ui
          .images=${this.productToRender ? this.productToRender.images : []}
          .discount=${true}
          real-price=${this.productToRender.price}
          >
          <h2 slot="campain-name">${this.productToRender ? this.productToRender.title : ''} </h2>
          <p slot="description" class="product-ui-description"> 
            ${this.productToRender.description}
          </p>
        </product-ui>
      </div>
    `
  }

  static get styles() {
    return css `
      .product-ui-description {
        color: gray;
      }
    `
  }
}

window.customElements.define('index-root', Index)
