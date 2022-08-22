import { useState, useContext, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import { IngredientsContext } from "../../services/ingredientsContext";

const localizedTypes = {
  bun: "булки",
  main: "начинки",
  sauce: "соусы",
};

const BurgerIngredients = () => {
  const ingredients = useContext(IngredientsContext);

  const [currentType, setCurrentType] = useState("bun");

  const ingredientsByType = useMemo(() => {
    return ingredients.reduce(
      (acc, item) => {
        const type = item.type;

        return {
          ...acc,
          [type]: [...acc[type], item],
        };
      },
      { bun: [], main: [], sauce: [] }
    );
  }, [ingredients]);

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <ul className={`${burgerIngredientsStyles["tabs-container"]} mb-10`}>
        <li>
          <Tab
            value="bun"
            active={currentType === "bun"}
            onClick={setCurrentType}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={currentType === "sauce"}
            onClick={setCurrentType}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="main"
            active={currentType === "main"}
            onClick={setCurrentType}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <div
        className={`${burgerIngredientsStyles["scroll-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-5`}
      >
        {Object.entries(ingredientsByType).map(
          ([type, ingredients], _, index) => {
            return (
              <div key={type} className={`pb-5 ${index ? "" : "pt-5"}`}>
                <h2
                  className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
                >
                  {localizedTypes[type]}
                </h2>
                <ul
                  className={burgerIngredientsStyles["ingredients-container"]}
                >
                  {ingredients.map((item) => (
                    <BurgerIngredientCard key={item._id} ingredient={item} />
                  ))}
                </ul>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
