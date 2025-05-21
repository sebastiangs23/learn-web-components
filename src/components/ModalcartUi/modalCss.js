import { css } from "lit";

export const modalStyle = css`
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