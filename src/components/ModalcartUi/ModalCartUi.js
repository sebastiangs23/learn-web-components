import { LitElement, html, css } from 'lit';

export class ModalCart extends LitElement {
  static get properties() {
    return {
      image: { type: String },
      quantity: { type: Number },
      totalPrice: { type: Number },
      open: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.image = '';
    this.quantity = 0;
    this.totalPrice = 0;
    this.open = false;
  }

  static get styles() {
    return css`
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .modal-content {
        background-color: white;
        border-radius: 12px;
        padding: 24px;
        width: 320px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: fadeIn 0.3s ease-in-out;
      }

      img {
        width: 100px;
        border-radius: 10px;
        margin-bottom: 12px;
      }

      .modal-actions {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }

      button {
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        flex: 1;
      }

      .btn-pay {
        background-color: hsl(26, 100%, 55%);
        color: white;
      }

      .btn-cancel {
        background-color: #ccc;
        color: #333;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }

  _pay() {
    this.dispatchEvent(new CustomEvent('modal-pay', { bubbles: true, composed: true }));
    this.open = false;
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('modal-cancel', { bubbles: true, composed: true }));
    this.open = false;
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="modal">
        <div class="modal-content">
          <h3>Confirmar Compra</h3>
          <img src="${this.image}" alt="Producto" />
          <p>Cantidad: <strong>${this.quantity}</strong></p>
          <p>Total: <strong>$ ${this.totalPrice.toFixed(2)}</strong></p>
          <div class="modal-actions">
            <button class="btn-cancel" @click=${this._cancel}>Cancelar</button>
            <button class="btn-pay" @click=${this._pay}>Pagar</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-cart', ModalCart);
