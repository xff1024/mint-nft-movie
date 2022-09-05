import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/web3.utils";

const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
