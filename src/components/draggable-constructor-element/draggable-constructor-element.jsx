import { useCallback } from "react";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  updateIngredientsSorting,
} from "../../services/actions/ingredients-constructor";
import { useDrag, useDrop } from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";

const DraggableConstructorElement = ({ ingredient, itemIndex }) => {
  const dispatch = useDispatch();

  const [_, dropRef] = useDrop({
    accept: "ingredient",
    drop(draggedIngredient) {
      dispatch(updateIngredientsSorting(draggedIngredient, itemIndex));
    },
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { item: ingredient, draggedItemIndex: itemIndex },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleRemoveIngredient = useCallback(
    (ingredient, index) => {
      dispatch(removeIngredient(ingredient, index));
    },
    [dispatch]
  );

  return (
    <li ref={dropRef}>
      <div
        style={{ opacity: isDrag ? "0.6" : 1 }}
        ref={dragRef}
        className={burgerConstructorStyles["constructor-element-container"]}
      >
        <button
          type="button"
          aria-label="draggable-button"
          className={
            burgerConstructorStyles["constructor-element-draggeble-button"]
          }
        >
          <DragIcon />
        </button>
        <ConstructorElement
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleRemoveIngredient(ingredient, itemIndex)}
        />
      </div>
    </li>
  );
};

export default DraggableConstructorElement;
