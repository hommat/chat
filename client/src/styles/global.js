import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #f1f1f1;;
  }

  body {
    background: #0e0d12;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    height: 100vh;
  }
`;

export default GlobalStyles;
