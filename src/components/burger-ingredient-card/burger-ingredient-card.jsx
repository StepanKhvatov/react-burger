import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientCardStyles from "./burger-ingredient-card.module.css";
import { ingredientPropTypes } from "../../utils/types";

const BurgerIngredientCard = ({ ingredient }) => {
  const { name, price, image } = ingredient;

  return (
    <li className={`${burgerIngredientCardStyles.card} p-3`}>
      <Counter count={1} size="default" />
      <img
        alt={name}
        className={burgerIngredientCardStyles.image}
        src={image}
      />
      <span
        className={`${burgerIngredientCardStyles.price} text text_type_digits-default mb-2 mt-2`}
      >
        {price}
        <CurrencyIcon />
      </span>
      <h4
        className={`${burgerIngredientCardStyles.name} text text_type_main-default`}
      >
        {name}
      </h4>
    </li>
  );
};

export default BurgerIngredientCard;

BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
