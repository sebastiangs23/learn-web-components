import { LitElement, html, css } from 'lit';
import { modalStyle } from './modal.css';

export class ModalCart extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      image: { type: String },
      quantity: { type: Number },
      totalPrice: { type: Number },
      modalType: { type: Number } //Type 1: Agregar al carrito  && Type 2: Mostrar lo que contiene el carrito 
    };
  }

  constructor() {
    super();
    this.showAddButton = true;
    this.image = '';
    this.quantity = 0;
    this.totalPrice = 0;
    this.open = false;
  }

  _add() {
    this.dispatchEvent(new CustomEvent('modal-add', { bubbles: true, composed: true }));
    this.open = false;
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('modal-cancel', { bubbles: true, composed: true }));
    this.open = false;
  }

  _delete() {
    this.dispatchEvent(new CustomEvent('modal-delete', { bubbles: true, composed: true }));
    this.open = false;
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="modal">
        <div class="modal-content">
          <slot name="title"></slot>
          <img src="${this.image}" alt="Producto" />
          <p>Cantidad: <strong>${this.quantity}</strong></p>
          <p>Total: <strong>$ ${this.totalPrice.toFixed(2)}</strong></p>
          <div class="modal-actions">
            <button class="btn-cancel" @click=${this._cancel}>Cancelar</button>
            ${ this.modalType === 1 ? html `
              <button class="btn-pay" @click=${this._add}>Agregar</button>`
              : html``
            }

            ${ this.modalType === 2 ? html`
                <button class="btn-delete" @click=${this._delete}>Eliminar</button>
              ` : html`` }
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return modalStyle;
  }
}

customElements.define('modal-cart', ModalCart);
