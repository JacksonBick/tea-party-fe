describe("SubscriptionContainer", () => {
  it("displays a grid of subscriptions", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Tea Subscription Service").should("exist");
    cy.get(".subscription-card", { timeout: 10000 }).should("have.length.at.least", 1);
  });

  it("navigates to a subscription detail page when clicked", () => {
    cy.visit("http://localhost:5173");

    cy.get(".subscription-card", { timeout: 10000 }).should("have.length.at.least", 1);

    cy.get(".subscription-card").first().click();

    cy.url().should("include", "/subscriptions/");
    cy.contains("Current Customers").should("exist");
  });
});