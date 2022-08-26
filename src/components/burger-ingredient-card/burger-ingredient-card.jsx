import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientCardStyles from "./burger-ingredient-card.module.css";
import { ingredientPropTypes } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
  setViewedIngredient,
  removeViewedIngredient,
} from "../../services/actions/viewed-ingredient";
import { useDrag } from "react-dnd";
import { selectIngredientQuantity } from "../../services/selectors/ingredients-constructor";

const BurgerIngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  const ingredientQuantity = useSelector((store) =>
    selectIngredientQuantity(store, ingredient)
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [isOpenInrgedientModal, setOpenIngredientModal] = useState(false);

  const { name, price, image } = ingredient;

  const handleSetViewedIngredient = () => {
    setOpenIngredientModal(true);

    dispatch(setViewedIngredient(ingredient));
  };

  const handleRemoveViewedIngredient = () => {
    setOpenIngredientModal(false);

    dispatch(removeViewedIngredient());
  };

  const onKeydownSelect = (event) => {
    if (event.key === "Enter") {
      handleSetViewedIngredient();
    }
  };

  return (
    <>
      <li
        ref={dragRef}
        tabIndex={0}
        style={{ opacity: isDrag ? "0.6" : 1 }}
        onKeyDown={onKeydownSelect}
        onClick={handleSetViewedIngredient}
        className={`${burgerIngredientCardStyles.card} m-3`}
      >
        {!!ingredientQuantity && (
          <Counter count={ingredientQuantity} size="default" />
        )}

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
          isOpen={isOpenInrgedientModal}
          onClose={handleRemoveViewedIngredient}
          title="Детали ингредиента"
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientCard;

BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
