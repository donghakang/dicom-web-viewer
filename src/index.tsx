import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import initCornerstone from "./components/cornerstone/init";
import { Provider } from "react-redux";
import store from './redux/store'


initCornerstone();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
