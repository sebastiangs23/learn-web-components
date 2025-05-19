import { LitElement, html, css } from "lit"
import cart from '../../assets/svgs/icon-cart.svg'
import '../ModalcartUi/ModalCartUi'

export class ProductUi extends LitElement {
    static get properties() {
        return {
            counter: { type: Number },
            images: { type: Array, attribute: 'images' },
            realPrice: { type: Number, attribute: 'real-price' },
            discount: { type: Boolean },
            mainImage: { type: String },
            selectedImage: { type: String },
            modalOpen: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.images = [];
        this.counter = 0;
        this.realPrice = 0;
        this.discount = false;
        this.mainImage = '';
        this.selectedImage = '';
        this.modalOpen = false;
    }

    updated(changedProps) {
        if (changedProps.has('images') && this.images?.length > 0) {
            this.mainImage = this.images[0];
            this.selectedImage = this.images[0];
        }
    }

    _setMainImage(img) {
        this.mainImage = img;
        this.selectedImage = img;
    }

    _decrement() {
        if (this.counter > 0) {
            this.counter--;
            this.requestUpdate();
        }
    }

    _increment() {
        this.counter++;
        this.requestUpdate();
    }    

    _openModal() {
        this.modalOpen = true;
      }
      
    _handlePay() {
      console.log("Pagando...");
      //Añadirle una libreria mañana
    }
    
    _handleCancel() {
      this.modalOpen = false;
    }

    static get styles() {
        return css`
            .section {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 500px;
            }

            .section__row_1 {
                margin: 15px;
            }

            .section__row_1-img{
                width: 400px;
                border-radius: 10px;
            }

            .section__row_1-img-mini-container {
                display: flex;
                justify-content: space-between;
            }

            .section__row_1-img-mini {
                width: 70px;
                border-radius: 5px;
            }
            
            .section__row_2 {
                margin: 15px;
            }

            .section__row_2-title {
                font-family: "Kumbh Sans", sans-serif;
                color: gray;
                font-size: 0.9rem;
                font-weight: 700;
            }

            slot[name="campain-name"]{
                font-family: "Kumbh Sans", sans-serif;
                font-size: 1.5rem;
            }

            slot[name="description"]{
                font-family: "Kumbh Sans", sans-serif;
            }

            .price__section {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .section__row-2-price {
                font-family: "Kumbh Sans", sans-serif;
                font-weight: bold;
            }

            .price__size--small {
                font-size: 1rem;
            }

            .price__size--normal {
                font-size: 1.4rem;
            }

            .section__row-2-real-price {
                font-family: "Kumbh Sans", sans-serif;
                font-size: 1rem;
                color: gray;
                font-weight: bold;
                text-decoration: line-through;
            }

            .price__section-badge {
                font-family: "Kumbh Sans", sans-serif;
                display: inline-block;
                background-color: #22252d;
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-weight: bold;
                font-size: 0.9rem;
                min-width: 40px;
                height: 20px;
                text-align: center;
                user-select: none;
            }

            .section__row-2-controls {
                display: flex;
                gap: 5px;
            }

            .section__row_2-counter {
                width: 150px;
                height: 50px;
                background-color: #ececec;
                border-radius: 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .section__row_2-counter-buttons {
                border: none;
                cursor: pointer;
            }

            .section__row_2-button {
                width: 250px;
                height: 50px;
                border-radius: 10px;
                background-color: hsl(26, 100%, 55%);
                border-width: 0px;
                font-size: 1rem;
                font-weight: 700;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
                cursor: pointer;
            }

            .section__row_1-img-mini.selected {
                outline: 2px solid hsl(26, 100%, 55%);
                border-radius: 10px;
                opacity: 0.5;
            }
        `
    }

    render() {
        const discountedPrice = (this.realPrice / 2).toFixed(2);

        return html`
            <section class="section">
                <div class="section__row_1">
                    <img 
                      class="section__row_1-img" 
                      src=${this.mainImage}
                      alt="Imagen principal" 
                    />

                    <div class="section__row_1-img-mini-container">
                    ${this.images?.map(
                      (img) => html`
                        <img 
                          class="section__row_1-img-mini ${this.selectedImage === img ? 'selected' : ''}"
                          src=${img} 
                          alt="Miniatura" 
                          @click=${() => this._setMainImage(img)}
                        />
                      `
                    )}
                    </div>
                </div>

                <div class="section__row_2">
                    <h3 class="section__row_2-title">SNEAKER COMPANY</h3>  
                    <slot name="campain-name"></slot>
                    <slot name="description"></slot>

                     <div class="price__section">
                        ${this.discount
                          ? html`

                              <span class="section__row-2-price price__size--normal">$ ${discountedPrice}</span>
                              <span class="price__section-badge">50%</span>
                            `
                          : html`<p class="section__row-2-price price__size--normal">$ ${this.realPrice}</p>`
                        }
                    </div>

                    ${this.discount
                      ? html`<p class="section__row-2-real-price">$ ${this.realPrice}</p>`
                      : ''
                    }


                    <div class="section__row-2-controls">
                        <div class="section__row_2-counter">
                            <button class="section__row_2-counter-buttons" @click=${this._decrement}>-</button>
                            <span class="section__row-2-price price__size--small" >${this.counter} </span>
                            <button class="section__row_2-counter-buttons" @click=${this._increment} >+</button>
                        </div>

                        <button class="section__row_2-button" @click=${this._openModal}>
                            <img src=${cart} />
                            <span>Add to cart</span>
                        </button>
                    </div>
                </div>

                <modal-cart
                  .open=${this.modalOpen}
                  .image=${this.mainImage}
                  .quantity=${this.counter}
                  .totalPrice=${this.discount ? this.realPrice / 2 * this.counter : this.realPrice * this.counter}
                  @modal-pay=${this._handlePay}
                  @modal-cancel=${this._handleCancel}>
                </modal-cart>
            </section>
        `
    }
}

customElements.define('product-ui', ProductUi);