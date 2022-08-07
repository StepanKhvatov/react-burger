import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerIngredients as mockData } from "../../utils/data";
import burgerConstructorStyles from "./burger-constructor.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";

const BurgerConstructor = ({ data = mockData }) => {
  const ingredients = data.reduce(
    (acc, item) => {
      const key = item.type === "bun" ? "blocked" : "unblocked";

      return {
        ...acc,
        [key]: [...acc[key], item],
      };
    },
    { blocked: [], unblocked: [] }
  );

  const [topIngredient, bottomIngredient] = ingredients.blocked;

  return (
    <div className={burgerConstructorStyles["ingredients-container"]}>
      <div
        className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
      >
        <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
          <ConstructorElement
            isLocked
            type="top"
            text={topIngredient.name}
            price={topIngredient.price}
            thumbnail={topIngredient.image}
          />
        </div>
      </div>
      <div
        style={{ maxHeight: 660, overflowY: "scroll" }}
        className={`${burgerConstructorStyles["ingredients-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-6`}
      >
        {ingredients.unblocked.map((item) => {
          return (
            <div
              key={item._id}
              className={
                burgerConstructorStyles["constructor-element-container"]
              }
            >
              <button aria-label="druggable-button" type="button">
                <DragIcon />
              </button>
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
      >
        <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
          <ConstructorElement
            isLocked
            type="bottom"
            text={bottomIngredient.name}
            price={bottomIngredient.price}
            thumbnail={bottomIngredient.image}
          />
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};
