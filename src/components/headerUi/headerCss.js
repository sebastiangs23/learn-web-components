import { css } from "lit";

export const headerStyle = css`
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        
        width: 100%;
        padding: 0 20px;
        position: relative;
      }

      .header__title {
        font-size: 2.25rem;
        font-family: "Kumbh Sans", sans-serif;
        font-weight: 700;
        margin-right: 50px;
      }
      
      .header__ul {
        display: flex;
        list-style: none;
        align-items: center;
        gap: 20px;
        margin-right: 300px;
        padding: 0;
      }

      .header__ul li a {
        text-decoration: none;
        font-family: "Kumbh Sans", sans-serif;
        font-weight: 400;
        color: gray;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        padding-bottom: 2px;
        transition: color .2s, border-color .2s;
      }

      .header__ul li:hover a {
        color: #ff871e;
        border-bottom-color: #ff871e; 
      }

      .header__cart-container {
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
      }

      .header__cart {
        height: 25px;
        width: 25px;
      }

      .header__avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-left: 20px;
        cursor: pointer;
      }

      .header__divider {
        border: none;
        height: 1px;
        background-color: #ccc;
        margin: 10px 0;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
      }

      .header__hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        position: relative;
      }

      .header__hamburger div {
        width: 25px;
        height: 3px;
        background-color: black;
        border-radius: 2px;
      }

      @media (max-width: 768px) {
        .header__ul {
          display: none;
          position: absolute;
          top: 95px; /* debajo del hamburgues */
          left: 0;
          background: white;
          box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
          padding: 10px;
          border-radius: 8px;
          flex-direction: column;
          gap: 10px;
          z-index: 999;
          min-width: 150px;
        }

        .header__ul.mobile-open {
          display: flex;
          align-items: flex-start;
        }

        .header__hamburger {
          display: flex;
          margin-left: 40px;
        }

        .header__avatar {
          height: 40px;
          width: 40px;
          margin-left: 10px;
        }

        .header__title {
          font-size: 2.5rem;
          margin-left: 25px;
        }
      }
    `
    ;