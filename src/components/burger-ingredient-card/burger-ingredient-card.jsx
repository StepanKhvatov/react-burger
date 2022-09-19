import { useHistory } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientCardStyles from "./burger-ingredient-card.module.css";
import { ingredientPropTypes } from "../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { selectIngredientQuantity } from "../../services/selectors/ingredients-constructor";
import { setViewedIngredientComponent } from "../../services/actions/viewed-ingredient";

const BurgerIngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  const history = useHistory();

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

  const onIngredientClick = () => {
    dispatch(setViewedIngredientComponent("modal"));

    history.replace({
      pathname: `/ingredients/${ingredient._id}`,
    });
  };

  const { name, price, image } = ingredient;

  return (
    <>
      <li
        ref={dragRef}
        tabIndex={0}
        style={{ opacity: isDrag ? "0.6" : 1 }}
        onClick={onIngredientClick}
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
    </>
  );
};

export default BurgerIngredientCard;

BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
