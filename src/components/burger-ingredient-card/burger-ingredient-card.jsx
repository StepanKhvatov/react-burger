import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import burgerIngredientCardStyles from "./burger-ingredient-card.module.css";

const BurgerIngredientCard = ({
  name,
  proteins,
  fat,
  carbohydrates,
  price,
  image,
}) => {
  return (
    <li className={`${burgerIngredientCardStyles.card} p-3`}>
      <img
        alt="ingredient"
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
