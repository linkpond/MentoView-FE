import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #555;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
