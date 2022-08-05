import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import constructorPageStyles from "./constructor-page.module.css";

const ConstructorPage = () => {
  return (
    <section className={constructorPageStyles["constructor-page"]}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={constructorPageStyles["content-container"]}>
        <BurgerIngredients />
      </div>
    </section>
  );
};

export default ConstructorPage;
