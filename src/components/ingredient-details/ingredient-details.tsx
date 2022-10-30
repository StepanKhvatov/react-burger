import { FC } from "react";
import { useAppSelector } from "../../services/store";
import { selectViewedIngredient } from "../../services/selectors/viewed-ingredient";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import InfoColumn from "../info-column/info-column";

const IngredientDetails: FC = () => {
  const ingredient = useAppSelector(selectViewedIngredient);

  const { image_large, name, calories, fat, proteins, carbohydrates } =
    ingredient || {};

  return (
    <div
      className={ingredientDetailsStyles.container}
      data-testid="ingredient-details"
    >
      <img
        src={image_large}
        alt={name}
        className={`${ingredientDetailsStyles.image} mb-4`}
        data-testid="ingredient-details-image"
      />
      <h4
        className="text text_type_main-medium mb-8"
        data-testid="ingredient-details-name"
      >
        {name}
      </h4>
      <div className={ingredientDetailsStyles["info-container"]}>
        <InfoColumn
          title="Калории,ккал"
          value={calories}
          dataTestId="ingredient-details-calories"
        />
        <InfoColumn
          title="Белки, г"
          value={proteins}
          dataTestId="ingredient-details-proteins"
        />
        <InfoColumn
          title="Жиры, г"
          value={fat}
          dataTestId="ingredient-details-fat"
        />
        <InfoColumn
          title="Углеводы, г"
          value={carbohydrates}
          dataTestId="ingredient-details-carbohydrates"
        />
      </div>
    </div>
  );
};

export default IngredientDetails;
