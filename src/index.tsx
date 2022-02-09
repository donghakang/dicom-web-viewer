import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import initCornerstone from "./components/cornerstone/init";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";


initCornerstone();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
