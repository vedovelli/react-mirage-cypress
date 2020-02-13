/* eslint-disable no-undef */
import { makeServer } from "../../src/server";

let server;

beforeEach(() => (server = makeServer({ environment: "test" })));
afterEach(() => server.shutdown());

describe("App.js", () => {
  it("Mounts and displays an H1", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Test");
  });

  it("displays a list of users", () => {
    const user1 = server.create("user", { name: "Bob" });
    const user2 = server.create("user", { name: "Alice" });

    cy.log(JSON.stringify([user1, user2]));

    cy.visit("http://localhost:3000/");

    // cy.get("[data-testid=user]").should("have.length", 3);
  });
});
