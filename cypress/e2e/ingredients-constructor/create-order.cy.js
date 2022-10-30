describe("Create order", () => {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("перетаскивание ингредиента в конструктор и клик на кнопку оформления с переходом на страницу логина", () => {
    cy.get("[data-testid=burger-ingredient-card]").first().as("ingredient");
    cy.get("[data-testid=burger-constructor]").as("constructor");
    cy.get("[name=order-submit-button]").as("order-submit-button");

    const dataTransfer = new DataTransfer();

    cy.get("@ingredient").trigger("dragstart", { dataTransfer: dataTransfer });

    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });

    cy.get("[data-testid=blocked-constructor-ingredient]").as(
      "blocked-constructor-ingredient"
    );

    cy.get("@order-submit-button").click();

    cy.scrollTo("top");
  });

  it("Ввод логина и пароля тестового пользователя с переходом на страницу конструктора", () => {
    cy.get("[name=email]").as("email-input");
    cy.get("[name=password]").as("password-input");
    cy.get("[name=login-submit-button]").as("login-submit-button");

    cy.get("@email-input").focus();
    cy.get("@email-input").type("test_user@yandex.ru");

    cy.get("@password-input").focus();
    cy.get("@password-input").type("Password123!");

    cy.get("@login-submit-button").click();
  });

  it("Оформление заказа и ожидание модального окна", () => {
    cy.get("[name=order-submit-button]").as("order-submit-button");

    cy.get("@order-submit-button").click();

    cy.intercept({
      method: "POST",
      url: "https://norma.nomoreparties.space/api/orders",
    }).as("createOrderResponse");

    cy.wait("@createOrderResponse")
      .its("response.statusCode")
      .should("equal", 200);

    cy.get("[data-testid=order-details]").as("order-details");
  });

  it("закрытие модального окна с деталями заказа", () => {
    cy.get("[data-testid=order-details]").as("order-details");
    cy.get("[data-testid=modal-close-button]").as("close-button");

    cy.get("@close-button").click();
  });
});
