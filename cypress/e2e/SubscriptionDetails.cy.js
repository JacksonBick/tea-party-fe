describe("SubscriptionDetail", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/subscriptions/1");
    cy.contains("Total Price").should("exist");
  });

  it("toggles tea inclusion in total price without removing it from the DOM", () => {
    // Find the first tea card and check its initial state
    cy.get(".tea-card").first().as("teaCard");

    // It should initially contain "Remove from Total"
    cy.get("@teaCard").contains("Remove from Total").should("exist");

    // Click to exclude the tea
    cy.get("@teaCard").contains("Remove from Total").click();

    // Now it should show "Include in Total"
    cy.get("@teaCard").contains("Include in Total").should("exist");

    // Optionally check opacity changed to 0.5
    cy.get("@teaCard").should("have.css", "opacity", "0.5");

    // Toggle it back
    cy.get("@teaCard").contains("Include in Total").click();
    cy.get("@teaCard").contains("Remove from Total").should("exist");
    cy.get("@teaCard").should("have.css", "opacity", "1");
  });
});
  