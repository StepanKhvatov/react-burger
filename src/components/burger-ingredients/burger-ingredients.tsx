import { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import { useAppSelector } from "../../services/store";
import { selectIngredientsByType } from "../../services/selectors/ingredients";
import type { TIngredient } from "../../types";

const BurgerIngredients = () => {
  const { ref: bunRef, inView: bunInView } = useInView({
    threshold: 1,
    root: document.getElementById("scroll-container"),
  });

  const { ref: sauceRef, inView: sauceInView } = useInView({
    threshold: 1,
    root: document.getElementById("scroll-container"),
  });

  const { ref: mainRef, inView: mainInView } = useInView({
    threshold: 0.3,
    root: document.getElementById("scroll-container"),
  });

  const { bun, main, sauce } = useAppSelector(selectIngredientsByType);

  const [currentType, setCurrentType] = useState<string>("bun");

  useEffect(() => {
    if (bunInView) {
      setCurrentType("bun");
    }
  }, [bunInView]);

  useEffect(() => {
    if (sauceInView) {
      setCurrentType("sauce");
    }
  }, [sauceInView]);

  useEffect(() => {
    if (mainInView) {
      setCurrentType("main");
    }
  }, [mainInView]);

  const onTabClick = (tab: string) => {
    setCurrentType(tab);

    const element = document.getElementById(tab);

    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className={burgerIngredientsStyles["burger-ingredients"]}>
      <ul className={`${burgerIngredientsStyles["tabs-container"]} mb-10`}>
        <li className={burgerIngredientsStyles.tab}>
          <Tab value="bun" active={currentType === "bun"} onClick={onTabClick}>
            Булки
          </Tab>
        </li>
        <li className={burgerIngredientsStyles.tab}>
          <Tab
            value="sauce"
            active={currentType === "sauce"}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </li>
        <li className={burgerIngredientsStyles.tab}>
          <Tab
            value="main"
            active={currentType === "main"}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <div
        id="scroll-container"
        className={`container__scroll-content ${customScrollbarStyles["custom-scrollbar"]} pr-5`}
      >
        <div ref={bunRef} id="bun" className="pb-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Булки
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {bun.map((item: TIngredient) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
        <div ref={sauceRef} id="sauce" className="pb-5 pt-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Соусы
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {sauce.map((item: TIngredient) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
        <div ref={mainRef} id="main" className="pb-5 pt-5">
          <h2
            className={`${burgerIngredientsStyles.type} text text_type_main-medium mb-6`}
          >
            Начинки
          </h2>
          <ul className={burgerIngredientsStyles["ingredients-container"]}>
            {main.map((item: TIngredient) => (
              <BurgerIngredientCard key={item._id} ingredient={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
