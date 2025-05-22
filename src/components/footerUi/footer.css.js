import { css } from "lit";

export const footerStyles = css`
  footer {
    padding: 20px 40px;
    background-color: #22252d;
    color: white;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .footer__divider {
    border: none;
    height: 1px;
    background-color: #444851;
    margin-bottom: 20px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  h4 {
    margin: 0 0 15px 0;
    font-weight: 600;
    font-size: 1.4rem;
  }

  .contact-info {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-info a {
    color: #f9a825;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-info a:hover {
    color: #fff176;
  }

  @media (max-width: 600px) {
    footer {
      padding: 15px 20px;
    }

    h4 {
      font-size: 1.2rem;
    }

    .contact-info {
      font-size: 0.95rem;
      padding: 0 10px;
    }
  }
`;
