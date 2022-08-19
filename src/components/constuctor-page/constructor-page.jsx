import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import constructorPageStyles from "./constructor-page.module.css";

const ConstructorPage = () => {
  return (
    <section
      className={`${constructorPageStyles["constructor-page"]} pt-10 pb-10 pr-5 pl-5`}
    >
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <main className={constructorPageStyles["content-container"]}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </section>
  );
};

export default ConstructorPage;
