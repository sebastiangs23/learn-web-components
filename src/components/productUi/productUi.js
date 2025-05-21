import { LitElement, html } from "lit"
import cart from '../../assets/svgs/icon-cart.svg'
import { getCurrentWidth, subscribe } from "../common/windowSize"
import '../ModalcartUi/ModalCartUi'
import { productStyle } from "./productCss"

export class ProductUi extends LitElement {
  static get properties() {
    return {
      productId: {type: Number },
      images: { type: Array, attribute: 'images' },
      realPrice: { type: Number, attribute: 'real-price' },
      discount: { type: Boolean },

      _counter: { type: Number },
      _mainImage: { type: String },
      _selectedImage: { type: String },
      _modalOpen: { type: Boolean },
      _currentWidth: { type: Number },
      _carouselIndex: { type: Number }
    }
  }

  constructor() {
    super();
    this.productId = 0;
    this.images = [];
    this.realPrice = 0;
    this.discount = false;

    this._counter = 1;
    this._mainImage = '';
    this._selectedImage = '';
    this._modalOpen = false;
    this._currentWidth = getCurrentWidth();
    this._carouselIndex = 0;
    this._unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = subscribe((width) => {
      this._currentWidth = width;
    });
  }

  disconnectedCallback() {
    if (this._unsubscribe) this._unsubscribe();
    super.disconnectedCallback();
  }

  updated(changedProps) {
    if (changedProps.has('images') && this.images?.length > 0) {
      this._mainImage = this.images[0];
      this._selectedImage = this.images[0];
      this._carouselIndex = 0;
    }
  }

  _set_mainImage(img) {
    this._mainImage = img;
    this._selectedImage = img;
  }

  _decrement() {
    if (this._counter > 1) {
      this._counter--;
      this.requestUpdate();
    }else {
      alert('No es posible ejecutar esta acción :)');
    }
  }

  _increment() {
    this._counter++;
    this.requestUpdate();
  }

  _openModal() {
    this._modalOpen = true;
  }

  _handleAdd() {
    //TODO: Revisar pq no me deja instalar dependencias
    const item = {
      productId: this.productId,
      image: this._mainImage,
      quantity: this._counter,
      totalPrice: this.discount
        ? (this.realPrice / 2) * this._counter
        : this.realPrice * this._counter
    }

    const cart = JSON.parse(localStorage.getItem('cartItem')) || [];
    cart.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cart));

    alert('Se realizo de manera exitosa el pago!'); 
  }

  _handleCancel() {
    this._modalOpen = false;
  }

  _carouselPrev() {
    if (this._carouselIndex > 0) {
      this._carouselIndex--;
    } else {
      this._carouselIndex = this.images.length - 1;
    }
    this._set_mainImage(this.images[this._carouselIndex]);
  }

  _carouselNext() {
    if (this._carouselIndex < this.images.length - 1) {
      this._carouselIndex++;
    } else {
      this._carouselIndex = 0;
    }
    this._set_mainImage(this.images[this._carouselIndex]);
  }

  render() {
    const discountedPrice = (this.realPrice / 2).toFixed(2);

    return html`
      <section class="section">

        <div class="section__row_1">
            ${this._currentWidth > 768 ? 
                html `
                    <img
                      class="section__row_1-img"
                      src=${this._mainImage}
                      alt="Imagen principal"
                    /> `
                : html ``
            }

          <div class="section__row_1-img-mini-container">
            ${this._currentWidth < 768
              ? html`
                <div class="carousel-container">
                    <button
                      class="carousel-btn left"
                      @click=${this._carouselPrev}
                      aria-label="Imagen anterior"
                    >
                      &lt;
                    </button>
                    <img
                      class="section__row_1-img-mini selected"
                      src=${this.images[this._carouselIndex]}
                      alt="Miniatura carrusel"
                    />
                    <button
                      class="carousel-btn right"
                      @click=${this._carouselNext}
                      aria-label="Imagen siguiente"
                    >
                      &gt;
                    </button>
                </div>
                `
              : html`
                  ${this.images?.map(
                    (img, index) => html`
                      <img
                        class="section__row_1-img-mini ${this._selectedImage === img
                          ? "selected"
                          : ""}"
                        src=${img}
                        alt="Miniatura"
                        @click=${() => {
                          this._set_mainImage(img);
                          this._carouselIndex = index;
                        }}
                      />
                    `
                  )}
                `}
          </div>
        </div>

        <div class="section__row_2">
          <h3 class="section__row_2-title">SNEAKER COMPANY</h3>
          <slot name="campain-name"></slot>
          <slot name="description"></slot>

          <div class="price__section">
            ${this.discount
              ? html`
                  <span class="section__row-2-price price__size--normal">
                    $ ${discountedPrice}
                  </span>
                  <span class="price__section-badge">50%</span>
                `
              : html` <p class="section__row-2-price price__size--normal">
                  $ ${this.realPrice}
                </p>`}
          </div>

          ${this.discount
            ? html`<p class="section__row-2-real-price">$ ${this.realPrice}</p>`
            : ""}

          <div class="section__row-2-controls">
            <div class="section__row_2-_counter">
              <button
                class="section__row_2-_counter-buttons"
                @click=${this._decrement}
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span class="section__row-2-price price__size--small">
                ${this._counter}
              </span>
              <button
                class="section__row_2-_counter-buttons"
                @click=${this._increment}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button class="section__row_2-button" @click=${this._openModal}>
              <img src=${cart} alt="Icono carrito" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>

        <modal-cart
          .open=${this._modalOpen}
          .image=${this._mainImage}
          .quantity=${this._counter}
          .totalPrice=${this.discount
            ? (this.realPrice / 2) * this._counter
            : this.realPrice * this._counter}
          @modal-add=${this._handleAdd}
          @modal-cancel=${this._handleCancel}
        >
            <h3 slot="title">Confirmar agregar al carrito: </h3>
        </modal-cart>
      </section>
    `;
  }

  static get styles() {
    return productStyle
  }
}

customElements.define("product-ui", ProductUi);
