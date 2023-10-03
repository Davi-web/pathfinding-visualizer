/// <reference types="cypress" />

describe("Home Page Spec", () => {
  it("Should render html with 10 buttons", () => {
    cy.visit("https://pathfinding-visualizer-janq.vercel.app");
    const description = cy.get("p .text-left");
    description.should("have.length", "1");
    description.should(
      "have.html",
      "This is a pathfinding visualizer that allows you to find the path between the start and end node. Add walls or generate a random board to visualize the path",
    );

    const buttons = cy.get("button");
    buttons.should("have.length", 10);
  });
});
