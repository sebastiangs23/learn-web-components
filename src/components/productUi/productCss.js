import { css } from "lit";

export const productStyle = css`
      :host {
        display: block;
        font-family: "Kumbh Sans", sans-serif;
        color: #22252d;
      }

      section.section {
        display: flex;
        gap: 40px;
        padding: 20px;
        max-width: 900px;
        margin: auto;
      }

      /* Imagen principal */
      .section__row_1 {
        flex: 1;
      }

      .section__row_1-img {
        width: 100%;
        border-radius: 15px;
        object-fit: cover;
        max-height: 400px;
      }

      /* Miniaturas y carrusel */
      .section__row_1-img-mini-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
      }

      .carousel-container {
        position: relative;
        display: inline-block;
      }

      .carousel-container img {
        border-radius: 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: hsl(26, 100%, 55%);
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s ease;
        z-index: 10;
      }

      .carousel-btn.left {
        left: 5px;
      }
      
      .carousel-btn.right {
        right: 5px;
      }

     
      .carousel-btn:hover {
        background-color: hsl(26, 100%, 40%);
      }

      .section__row_1-img-mini {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        object-fit: cover;
        opacity: 0.8;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .section__row_1-img-mini.selected {
        opacity: 1;
        border-color: hsl(26, 100%, 55%);
      }

      /* Info / descripción */
      .section__row_2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .section__row_2-title {
        font-weight: 700;
        font-size: 0.9rem;
        color: gray;
        letter-spacing: 2px;
        margin-bottom: 15px;
      }

      slot[name="campain-name"] {
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 20px;
        display: block;
      }

      slot[name="description"] {
        font-size: 1rem;
        color: #555;
        line-height: 1.5;
        margin-bottom: 25px;
        display: block;
      }

      /* Precio */
      .price__section {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;
      }

      .section__row-2-price {
        font-weight: 700;
        font-size: 1.8rem;
        color: hsl(26, 100%, 55%);
      }

      .price__section-badge {
        background-color: hsl(25, 100%, 94%);
        color: hsl(26, 100%, 55%);
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.9rem;
      }

      .section__row-2-real-price {
        font-size: 1rem;
        color: gray;
        font-weight: 700;
        text-decoration: line-through;
        margin-bottom: 20px;
      }

      /* Controles (contador + botón) */
      .section__row-2-controls {
        display: flex;
        gap: 15px;
      }

      .section__row_2-_counter {
        flex: 1;
        background-color: #f7f8fd;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        font-weight: 700;
        font-size: 1.4rem;
        color: hsl(26, 100%, 55%);
        user-select: none;
      }

      .section__row_2-_counter-buttons {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: hsl(26, 100%, 55%);
        font-weight: 700;
        padding: 0;
        width: 40px;
        height: 40px;
        line-height: 1;
        text-align: center;
        transition: color 0.3s ease;
      }

      .section__row_2-_counter-buttons:hover {
        color: hsl(26, 100%, 40%);
      }

      .section__row-2-price.price__size--small {
        margin: 0 15px;
        color: #22252d;
      }

      .section__row_2-button {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        background-color: hsl(26, 100%, 55%);
        border: none;
        border-radius: 12px;
        color: white;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        padding: 15px 0;
        box-shadow: 0 5px 15px rgba(255, 125, 26, 0.4);
        transition: background-color 0.3s ease;
      }

      .section__row_2-button img {
        width: 20px;
        height: 20px;
      }

      .section__row_2-button:hover {
        background-color: hsl(26, 100%, 40%);
      }

      /* Responsive - móviles */
      @media (max-width: 768px) {
        section.section {
          flex-direction: column;
          padding: 15px;
        }

        .section__row_1-img {
          max-height: 300px;
          border-radius: 12px;
        }

        .section__row_1-img-mini-container {
          justify-content: center;
        }

        .section__row_1-img-mini {
          width: 100%;
          height: 100%;
        }

        .section__row_2-controls {
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        .section__row_2-_counter {
          width: 100%;
          padding: 0 30px;
          font-size: 1.5rem;
          height: 60px;
          border-radius: 15px;
        }

        .section__row_2-_counter-buttons {
          width: 50px;
          height: 50px;
          font-size: 2.2rem;
        }

        .section__row-2-button {
          width: 100%;
          padding: 18px 0;
          font-size: 1.3rem;
          border-radius: 15px;
        }
      }
    `;