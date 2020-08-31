import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body, #app {
    height: 100%;
  }

  body {
    font: 14px 'Roboto', sans-serif;
    background: #ecf1f8;
    color: #333;
    -webkit-font-smoothing: antialiased !important;
  }
`;
