import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Pokemon } from "./components/Pokemon.tsx";
import PokemonList from "./components/PokemonList";

const client = new Client({
  url: "https://beta.pokeapi.co/graphql/v1beta/",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PokemonList />,
      },
      {
        path: "/pokemon/:id",
        element: <Pokemon />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
