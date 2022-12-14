import { useEffect, FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/store";
import {
  setViewedIngredient,
  removeViewedIngredient,
  setViewedIngredientComponent,
} from "../../services/actions/viewed-ingredient";
import { selectViewedIngredientComponent } from "../../services/selectors/viewed-ingredient";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { selectIngredientById } from "../../services/selectors/ingredients";

const IngredientPage: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const { ingredientId } = useParams<{ ingredientId: string }>();

  const ingredient = useAppSelector((store) =>
    selectIngredientById(store, ingredientId)
  );

  const viewedIngredientComponent = useAppSelector(
    selectViewedIngredientComponent
  );

  useEffect(() => {
    if (ingredient) {
      dispatch(setViewedIngredient(ingredient));

      return () => {
        dispatch(removeViewedIngredient());
      };
    }
  }, [ingredient, dispatch, history]);

  const onCloseModal = () => {
    history.replace({ pathname: `/` });

    dispatch(setViewedIngredientComponent("page"));
  };

  if (viewedIngredientComponent === "modal") {
    return (
      <Modal isOpen={true} onClose={onCloseModal} title="Детали ингредиента">
        <IngredientDetails />
      </Modal>
    );
  }

  return <IngredientDetails />;
};

export default IngredientPage;
