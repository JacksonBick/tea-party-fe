describe("Subscription Detail Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/subscriptions/1");
  });

  it("displays the subscription info and teas", () => {
    cy.contains("Total Price").should("exist");
    cy.get(".tea-card").should("have.length.at.least", 1);
  });

  it("toggles a tea's inclusion in the total without removing it from DOM", () => {
    cy.get(".tea-card").first().as("firstTea");

    cy.get("@firstTea").find("p").contains("Price:").invoke("text").then((priceText) => {
      const teaPrice = parseFloat(priceText.replace(/[^\d.]/g, ""));

      cy.contains("Total Price: $").invoke("text").then((originalText) => {
        const originalTotal = parseFloat(originalText.replace(/[^\d.]/g, ""));

        cy.get("@firstTea").contains("Remove from Total").click();
        cy.get("@firstTea").contains("Include in Total").should("exist");
        cy.get("@firstTea").should("have.css", "opacity", "0.5");

        cy.get("@firstTea").contains("Include in Total").click();
        cy.get("@firstTea").contains("Remove from Total").should("exist");
        cy.get("@firstTea").should("have.css", "opacity", "1");
      });
    });
  });

  it("updates total price when max price filter is applied", () => {
    cy.contains("Total Price: $").invoke("text").then((originalText) => {
      const originalTotal = parseFloat(originalText.replace(/[^\d.]/g, ""));

      cy.get("input[type='number']").clear().type("2.00");
      cy.wait(500);

      cy.contains("Total Price: $").invoke("text").then((filteredText) => {
        const newTotal = parseFloat(filteredText.replace(/[^\d.]/g, ""));
        expect(newTotal).to.be.lessThan(originalTotal);
      });
    });
  });
});