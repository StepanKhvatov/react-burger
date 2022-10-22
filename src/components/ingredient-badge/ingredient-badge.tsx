import { FC } from "react";
import styles from "./ingredien-badge.module.css";
import { TIngredient } from "../../types";

type TIngredientBadgeProps = {
  item: TIngredient;
  counter?: number;
};

const IngredientBadge: FC<TIngredientBadgeProps> = ({ item, counter }) => {
  const { image, name } = item;

  return (
    <div className={styles.container}>
      <div className={styles["content-container"]}>
        <img src={image} alt={`${name}-ingredient`} className={styles.image} />
        {counter && (
          <>
            <div
              className={`${styles["counter-container"]} flex items-center justify-center`}
            >
              <span className={`${styles.counter} text text_type_main-default`}>
                +{counter}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientBadge;
