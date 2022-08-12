import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientCardStyles from "./burger-ingredient-card.module.css";
import { ingredientPropTypes } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredientCard = ({ ingredient }) => {
  const [isOpenInrgedientModal, setOpenIngredientModal] = useState(false);

  const { name, price, image } = ingredient;

  const onKeydownSelect = (event) => {
    if (event.key === "Enter") {
      setOpenIngredientModal(true);
    }
  };

  return (
    <>
      <li
        tabIndex={0}
        onKeyDown={onKeydownSelect}
        onClick={() => setOpenIngredientModal(true)}
        className={`${burgerIngredientCardStyles.card} m-3`}
      >
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
      {isOpenInrgedientModal && (
        <Modal
          onClose={() => setOpenIngredientModal(false)}
          title="Детали ингредиента"
        >
          <IngredientDetails ingredient={ingredient}></IngredientDetails>
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientCard;

BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
