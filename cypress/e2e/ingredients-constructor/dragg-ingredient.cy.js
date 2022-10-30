describe("Drag ingredient", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("перетаскивание ингредиента в конструктор", () => {
    cy.get("[data-testid=burger-ingredient-card]").first().as("ingredient");
    cy.get("[data-testid=burger-constructor]").as("constructor");

    const dataTransfer = new DataTransfer();

    cy.get("@ingredient").trigger("dragstart", { dataTransfer: dataTransfer });

    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });

    cy.get("[data-testid=blocked-constructor-ingredient]").as(
      "blocked-constructor-ingredient"
    );

    cy.scrollTo("top");
  });
});
