/* eslint-disable no-undef */
import { makeServer } from "../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

describe("App.js", () => {
  it("Mounts and displays an H1", () => {
    cy.visit("/");

    cy.contains("Test");
  });

  it("displays a list of users", () => {
    server.create("user", { name: "Bob" });
    server.create("user", { name: "Alice" });

    cy.visit("/");

    cy.get("[data-testid=user]").should("have.length", 2);
  });

  it("displays an error message when server is down", () => {
    server.get("/users", () => {
      return new Response(500, {}, { error: "The database is on vacation." });
    });

    cy.visit("/");

    cy.contains("The database is on vacation.");
  });
});
