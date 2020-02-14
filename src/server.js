import { Server, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model
    },

    seeds(server) {
      server.create("user", { name: "Bob" });
      server.create("user", { name: "Alice" });
      server.create("user", { name: "Amanda" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", schema => {
        return schema.users.all();
      });
      // this.get("/users", () => {
      //   return new Response(500, {}, { error: "The database is on vacation." });
      // });
    }
  });

  return server;
}
