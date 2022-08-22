import { useContext, useReducer, useEffect } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import BurgerConstructorFooter from "../burger-constructor-footer/burger-constructor-footer";
import { IngredientsContext } from "../../services/ingredientsContext";
import burgerConstructorStyles from "./burger-constructor.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      const ingredients = action.payload;

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

      const unblockedIngredients = sortedIngredients.unblocked;

      const [bun] = sortedIngredients.blocked;

      const total =
        bun.price * 2 +
        unblockedIngredients.reduce((acc, item) => {
          return acc + item.price;
        }, 0);

      return {
        ...state,
        bun: bun,
        unblocked: unblockedIngredients,
        total: total,
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const initialState = {
  bun: null,
  unblocked: [],
  total: 0,
};

const BurgerConstructor = () => {
  const ingredients = useContext(IngredientsContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (ingredients.length) {
      dispatch({ type: "set", payload: ingredients });
    }
  }, [ingredients]);

  const blockedBun = state.bun;

  return (
    <div className={burgerConstructorStyles["ingredients-container"]}>
      {blockedBun && (
        <div
          className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
        >
          <div
            className={burgerConstructorStyles["blocked-ingredient-container"]}
          >
            <ConstructorElement
              isLocked
              type="top"
              text={`${blockedBun.name} (верх)`}
              price={blockedBun.price}
              thumbnail={blockedBun.image}
            />
          </div>
        </div>
      )}
      <div
        className={`${burgerConstructorStyles["scroll-container"]} ${burgerConstructorStyles["ingredients-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-6`}
      >
        {state.unblocked.map((item) => {
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
      {blockedBun && (
        <div
          className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
        >
          <div
            className={burgerConstructorStyles["blocked-ingredient-container"]}
          >
            <ConstructorElement
              isLocked
              type="bottom"
              text={`${blockedBun.name} (низ)`}
              price={blockedBun.price}
              thumbnail={blockedBun.image}
            />
          </div>
        </div>
      )}
      <BurgerConstructorFooter state={state} />
    </div>
  );
};

export default BurgerConstructor;
