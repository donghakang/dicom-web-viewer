import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
${normalize}

    :root {
        --letter-spacing-tighter: -0.05rem;
        --letter-spacign-tight: -0.025rem;
        


        --header-height: 44px;    // including progress bar
        --side-menu-width: 320px;
    }

  html, body {
    margin: 0;
    font-family: Inter, sans-serif;
    background-color: gray;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1, h2, h3{
      letter-spacing: var(--letter-spacing-tighter);
      font-weight: 800;
  }

  span {
      color: white;
  }
`;

export default GlobalStyle;
