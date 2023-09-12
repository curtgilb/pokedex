import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/reset.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "https://beta.pokeapi.co/graphql/v1beta/.",
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
