import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types";

const BurgerConstructor = ({ ingredients }) => {
  const sortedIngredients = ingredients.reduce(
    (acc, item) => {
      const key = item.type === "bun" ? "blocked" : "unblocked";

      return {
        ...acc,
        [key]: [...acc[key], item],
      };
    },
    { blocked: [], unblocked: [] }
  );

  const [blockedBun] = sortedIngredients.blocked;

  return (
    <div className={burgerConstructorStyles["ingredients-container"]}>
      <div
        className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
      >
        <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
          <ConstructorElement
            isLocked
            type="top"
            text={`${blockedBun.name} (верх)`}
            price={blockedBun.price}
            thumbnail={blockedBun.image}
          />
        </div>
      </div>
      <div
        style={{ maxHeight: 460, overflowY: "scroll" }}
        className={`${burgerConstructorStyles["ingredients-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-6`}
      >
        {sortedIngredients.unblocked.map((item) => {
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
            text={`${blockedBun.name} (низ)`}
            price={blockedBun.price}
            thumbnail={blockedBun.image}
          />
        </div>
      </div>
      <div className={`${burgerConstructorStyles["cunstructor-footer"]} mt-10`}>
        <div
          className={`${burgerConstructorStyles["total-price-container"]} mr-10`}
        >
          <span className="text text_type_digits-medium">1312</span>
          <CurrencyIcon width={50} type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
