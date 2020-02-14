import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Server, Response } from "miragejs";

if (process.env.NODE_ENV === "development") {
  require("./server").makeServer();
}

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach(method => {
        this[method]("/*", async (schema, request) => {
          return new Response(...(await window.handleFromCypress(request)));
        });
      });
    }
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
