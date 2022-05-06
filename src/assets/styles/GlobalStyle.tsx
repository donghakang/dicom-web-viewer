import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}

    :root {
        --letter-spacing-tighter: -0.05rem;
        --letter-spacign-tight: -0.025rem;
      
        --font-weight-heavy: 700;

        --header-height: 84px;    // including progress bar
        --right-side-menu-width: 320px;
        --left-side-menu-width: 280px;


        --dark-background: #2c2f31;
        --light-background: #55585a;

        --load-color1: #00E0C7;
        --load-color2: #009394;
        --load-color3: #006270;
        --text-color: #ffffff;
        --span-color: #999;
    }

  html, body {

    margin: 0;
    font-family: Inter, sans-serif;
    background-color: var(--dark-background);
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
      color: var(--text-color)
  }

  span {
      color: var(--span-color)
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
  }
`;

export default GlobalStyle;
