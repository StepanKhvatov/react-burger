import { FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import BurgerConstructorFooter from "../burger-constructor-footer/burger-constructor-footer";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { insertIngredient } from "../../services/actions/ingredients-constructor";
import DraggableConstructorElement from "../draggable-constructor-element/draggable-constructor-element";
import { selectConstructorIngredients } from "../../services/selectors/ingredients-constructor";
import { useAppDispatch, useAppSelector } from "../../services/store";
import type { TIngredientWithKey, TIngredient } from "../../types";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const [{ isHover }, dropRef] = useDrop<
    TIngredient,
    unknown,
    { isHover: boolean }
  >({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(insertIngredient(item));
    },
  });

  const { blockedItem, unblockedItems } = useAppSelector(
    selectConstructorIngredients
  );

  return (
    <div
      ref={dropRef}
      style={{
        border: isHover ? "1px solid #4C4CFF" : "1px solid transparent",
      }}
      className={burgerConstructorStyles["ingredients-container"]}
    >
      {blockedItem && (
        <div
          className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
        >
          <div
            className={burgerConstructorStyles["blocked-ingredient-container"]}
          >
            <ConstructorElement
              isLocked
              type="top"
              text={`${blockedItem.name} (верх)`}
              price={blockedItem.price}
              thumbnail={blockedItem.image}
            />
          </div>
        </div>
      )}
      {!!unblockedItems.length && (
        <ul
          className={`${burgerConstructorStyles["scroll-container"]} ${burgerConstructorStyles["ingredients-container"]} ${customScrollbarStyles["custom-scrollbar"]} pr-6`}
        >
          {unblockedItems.map((item: TIngredientWithKey, index: number) => {
            return (
              <DraggableConstructorElement
                key={item.key}
                ingredient={item}
                itemIndex={index}
              />
            );
          })}
        </ul>
      )}
      {blockedItem && (
        <div
          className={`${burgerConstructorStyles["constructor-element-container"]} pr-7`}
        >
          <div
            className={burgerConstructorStyles["blocked-ingredient-container"]}
          >
            <ConstructorElement
              isLocked
              type="bottom"
              text={`${blockedItem.name} (низ)`}
              price={blockedItem.price}
              thumbnail={blockedItem.image}
            />
          </div>
        </div>
      )}
      {!blockedItem && !unblockedItems.length && (
        <div className={burgerConstructorStyles["placeholder-container"]}>
          <h3 className="text text_type_main-medium">
            Нет добавленных ингредиентов для заказа
          </h3>
        </div>
      )}
      <BurgerConstructorFooter />
    </div>
  );
};

export default BurgerConstructor;
