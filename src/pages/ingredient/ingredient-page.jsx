import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setViewedIngredient,
  removeViewedIngredient,
} from "../../services/actions/viewed-ingredient";
import { selectViewedIngredientComponent } from "../../services/selectors/viewed-ingredient";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { selectIngredientById } from "../../services/selectors/ingredients";

const IngredientPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { ingredientId } = useParams();

  const ingredient = useSelector((store) =>
    selectIngredientById(store, ingredientId)
  );

  const viewedIngredientComponent = useSelector(
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
  };

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      {viewedIngredientComponent === "modal" ? (
        <Modal isOpen={true} onClose={onCloseModal} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      ) : (
        <IngredientDetails />
      )}
    </section>
  );
};

export default IngredientPage;
