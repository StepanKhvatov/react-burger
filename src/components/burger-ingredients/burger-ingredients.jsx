import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import { useSelector } from "react-redux";
import { selectIngredientsByType } from "../../services/selectors/ingredients";

const getOffset = (element, container) => {
  const offset =
    element.getBoundingClientRect().top - container.getBoundingClientRect().top;

  return offset;
};

const BurgerIngredients = () => {
  const { bun, main, sauce } = useSelector(selectIngredientsByType);

  const [currentType, setCurrentType] = useState("bun");

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");

    const listener = (event) => {
      const { target } = event;

      const childrensArray = Array.from(target.children);

      const offsetsElement = childrensArray.map((item) => {
        return {
          offset: Math.abs(getOffset(item, target)),
          id: item.id,
        };
      });

      const nearestElement = offsetsElement.reduce((acc, item) => {
        if (acc.offset < item.offset) {
          return acc;
        }

        return item;
      }, {});

      setCurrentType(nearestElement.id);
    };

    scrollContainer.addEventListener("scroll", listener);

    return () => {
      scrollContainer.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <ul className={`${burgerIngredientsStyles["tabs-container"]} mb-10`}>
        <li className={burgerIngredientsStyles.tab}>
          <Tab value="bun" active={currentType === "bun"}>
            Булки
          </Tab>
        </li>
        <li className={burgerIngredientsStyles.tab}>
          <Tab value="sauce" active={currentType === "sauce"}>
            Соусы
          </Tab>
        </li>
        <li className={burgerIngredientsStyles.tab}>
          <Tab value="main" active={currentType === "main"}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div
        id="scroll-container"
        className={`${burgerIngredientsStyles["scroll-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-5`}
      >
        <div id="bun" className="pb-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Булки
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {bun.map((item) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
        <div id="sauce" className="pb-5 pt-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Соусы
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {sauce.map((item) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
        <div id="main" className="pb-5 pt-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Начинки
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {main.map((item) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
