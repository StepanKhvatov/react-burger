import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import { burgerIngredients as mockData } from "../../utils/data";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";

const localizedTypes = {
  bun: "булки",
  main: "начинки",
  sauce: "соусы",
};

const BurgerIngredients = ({ data = mockData }) => {
  const [currentType, setCurrentType] = useState("bun");

  const burderIngredientsByType = data.reduce(
    (acc, item) => {
      const type = item.type;

      return {
        ...acc,
        [type]: [...acc[type], item],
      };
    },
    { bun: [], main: [], sauce: [] }
  );

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
        style={{ maxHeight: 660, overflowY: "scroll" }}
        className={`${customScrollbarStyles["custom-scrollbar"]} pr-5`}
      >
        {Object.entries(burderIngredientsByType).map(
          ([type, ingredients], _, index) => {
            return (
              <div key={type} className={`pb-5 ${index ? "" : "pt-5"}`}>
                <h3
                  className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
                >
                  {localizedTypes[type]}
                </h3>
                <ul
                  className={burgerIngredientsStyles["ingredients-container"]}
                >
                  {ingredients.map((item) => (
                    <BurgerIngredientCard
                      key={item._id}
                      name={item.name}
                      proteins={item.proteins}
                      fat={item.fat}
                      carbohydrates={item.carbohydrates}
                      price={item.price}
                      image={item.image}
                    />
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};
