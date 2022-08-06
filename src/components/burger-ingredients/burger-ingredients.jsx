import { useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import { burgerIngredients as data } from "../../utils/data";
import burgerIngredientsStyles from "./burger-ingredients.module.css";

const localizedTypes = {
  bun: "булки",
  main: "начинки",
  sauce: "соусы",
};

const BurgerIngredients = () => {
  const [currentType, setCurrentType] = useState("bun");

  const burderIngredientsByType = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const type = item.type;

        return {
          ...acc,
          [type]: [...acc[type], item],
        };
      },
      { bun: [], main: [], sauce: [] }
    );
  }, []);

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <ul className={burgerIngredientsStyles["tabs-container"]}>
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
      <div>
        {Object.entries(burderIngredientsByType).map(([type, ingredients]) => {
          return (
            <div key={type} className="pb-10 pt-10">
              <h3
                className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
              >
                {localizedTypes[type]}
              </h3>
              <div className={burgerIngredientsStyles["ingredients-container"]}>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BurgerIngredients;
