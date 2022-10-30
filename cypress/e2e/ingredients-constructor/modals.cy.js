describe("Modals", () => {
  before(function () {
    cy.visit("/");
  });

  it("открытие модального окна с описанием ингредиента", () => {
    cy.get("[data-testid=burger-ingredient-card]").first().as("ingredient");

    cy.get("@ingredient").click();

    cy.get("[data-testid=ingredient-details]").as("ingredient-details");

    cy.scrollTo("top");
  });

  it("отображение в модальном окне данных ингредиента", () => {
    cy.get("[data-testid=ingredient-details]").as("ingredient-details");

    cy.get("[data-testid=ingredient-details-image]").as(
      "ingredient-details-image"
    );

    cy.get("[data-testid=ingredient-details-name]").as(
      "ingredient-details-name"
    );

    cy.get("[data-testid=ingredient-details-calories]").as(
      "ingredient-details-calories"
    );

    cy.get("[data-testid=ingredient-details-proteins]").as(
      "ingredient-details-proteins"
    );

    cy.get("[data-testid=ingredient-details-fat]").as("ingredient-details-fat");

    cy.get("[data-testid=ingredient-details-carbohydrates]").as(
      "ingredient-details-carbohydrates"
    );

    cy.scrollTo("top");
  });

  it("закрытие модального окна с описанием ингредиента при клике на кнопку закрытия", () => {
    cy.get("[data-testid=ingredient-details]").as("ingredient-details");
    cy.get("[data-testid=modal-close-button]").as("close-button");

    cy.get("@close-button").click();
  });
});
