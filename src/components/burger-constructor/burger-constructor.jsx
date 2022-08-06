import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgerIngredients as data } from "../../utils/data";
import burgerConstructorStyles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
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
      <div className={burgerConstructorStyles["constructor-element-container"]}>
        <ConstructorElement
          isLocked
          type="top"
          text={topIngredient.name}
          price={topIngredient.price}
          thumbnail={topIngredient.image}
        />
      </div>
      {ingredients.unblocked.map((item) => {
        return (
          <div
            key={item._id}
            className={burgerConstructorStyles["constructor-element-container"]}
          >
            <button
              aria-label="druggable-button"
              type="button"
              className="pr-4"
            >
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
      <div className={burgerConstructorStyles["constructor-element-container"]}>
        <ConstructorElement
          isLocked
          type="bottom"
          text={bottomIngredient.name}
          price={bottomIngredient.price}
          thumbnail={bottomIngredient.image}
        />
      </div>
    </div>
  );
};

export default BurgerConstructor;
