import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import initCornerstone from "./components/cornerstone/init";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";
import { registerServiceWorker } from "./serviceWorkerRegistration";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'opened_dicom_viewer');


// service worker
registerServiceWorker();