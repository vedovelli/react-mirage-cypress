import { Server, Response, Model } from "miragejs";

export const makeServer = (environment = "development") => {
  if (window.Cypress) {
    // mirage cypress server
    return new Server({
      environment: "test",
      models: {
        user: Model
      },
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

  return new Server({
    environment,
    models: {
      user: Model
    },
    seeds(server) {
      server.create("user", { name: "Bob" });
      server.create("user", { name: "Alice" });
    },
    routes() {
      this.get("users", schema => {
        return schema.users.all();
      });
    }
  });
};
