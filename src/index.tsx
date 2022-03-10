import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import initCornerstone from "./components/cornerstone/init";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

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

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}