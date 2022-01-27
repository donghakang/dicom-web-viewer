import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import initCornerstone from "./components/cornerstone/init";

initCornerstone()
ReactDOM.render(<App />, document.getElementById("root"));
