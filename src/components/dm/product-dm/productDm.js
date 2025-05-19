import { LitElement } from 'lit' 

export class ProductDm extends LitElement {

    //Properties come first
    static get properties(){
        return {
            host: {type: String},
            product: {type: Object}
        }
    };

    constructor(){
        super();
        this.host = ""
        this.product = null
    };

    async getProduct(){
        try {
            if(!this.host){
                alert('El host deberia existir antes');
                return
            }
            //throw new Error('test: se rompio')
            const response = await fetch(this.host);

            if(!response.ok) {
                throw new Error('HTTP Error', response.status)
            }

            const data = await response.json();
            this.product = data;

            //Se le tiene que informar al padre de la respuesta
            this.dispatchEvent(new CustomEvent('product-dm-success', {
                detail: { products: this.product },
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            this._emitError(error.message);
        }
    }

    _emitError(message) {
        this.dispatchEvent(new CustomEvent('product-dm-error', {
          detail: { message },
          bubbles: true,
          composed: true
        }));
    }
}

customElements.define('product-dm', ProductDm);