import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --main-color: #56D3C7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'NanumGothic';
  }
  body {
    font-size: 14px;
    color: #555;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
