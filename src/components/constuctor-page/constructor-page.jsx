import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientPropTypes } from "../../utils/types";
import { IngredientsContext } from "../../services/ingredientsContext";
import constructorPageStyles from "./constructor-page.module.css";

const ConstructorPage = ({ ingredients }) => {
  return (
    <section
      className={`${constructorPageStyles["constructor-page"]} pt-10 pb-10 pr-5 pl-5`}
    >
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <main className={constructorPageStyles["content-container"]}>
        <BurgerIngredients ingredients={ingredients} />
        <IngredientsContext.Provider value={ingredients}>
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default ConstructorPage;
