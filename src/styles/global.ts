import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #ECF1F8;
    color: #000;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }

  body, input, button, textarea, select {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h1, h2, h3, h4, h5 h5, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
