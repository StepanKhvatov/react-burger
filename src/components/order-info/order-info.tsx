import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientBadge from "../ingredient-badge/ingredient-badge";
import { useAppSelector } from "../../services/store";
import { selectViewedOrder } from "../../services/selectors/viewed-order";
import { selectOrderTotal } from "../../services/selectors/order";
import { selectIngredientsByIds } from "../../services/selectors/ingredients";
import { localaizedStatuses } from "../../utils/constants";
import { getTime } from "../../utils/date";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import styles from "./order-info.module.css";
import { TIngredient } from "../../types";

type TGroupedIngredients = {
  [id: string]: {
    ingredient: TIngredient;
    count: number;
  };
};

const OrderInfo: FC<{ forModal?: boolean }> = ({ forModal }) => {
  const order = useAppSelector(selectViewedOrder);

  const {
    number,
    name,
    status = "created",
    ingredients = [],
    createdAt = "",
  } = order || {};

  const total = useAppSelector((store) => selectOrderTotal(store, order));

  const storeIngredients = useAppSelector((store) =>
    selectIngredientsByIds(store, ingredients)
  );

  const groupedIngredients = useMemo(() => {
    return storeIngredients.reduce((acc, item) => {
      if (item?._id) {
        const prevCount = acc[item._id]?.count || 0;

        return {
          ...acc,
          [item._id]: {
            ingredient: item,
            count: prevCount + 1,
          },
        };
      }

      return acc;
    }, {} as TGroupedIngredients);
  }, [storeIngredients]);

  return (
    <div className={`${styles.container} flex flex-col items-start`}>
      <span
        className={`text text_type_digits-default mb-10  w-full ${
          forModal ? "text-left" : "text-center"
        }`}
      >
        #{number}
      </span>
      <h3 className="text text_type_main-medium mb-3">{name}</h3>
      <p
        className={`text text_type_main-default text-left mb-15 ${
          status === "done" ? "text_color_success" : ""
        }`}
      >
        {localaizedStatuses[status]}
      </p>
      <div className="flex flex-col mb-10 w-full">
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div
          className={`${styles["ingredients-container"]} ${customScrollbarStyles["custom-scrollbar"]} ${customScrollbarStyles["custom-scrollbar_direction-vertical"]} flex flex-col pr-3`}
        >
          {Object.values(groupedIngredients).map((item) => {
            return (
              <div
                key={item.ingredient._id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <IngredientBadge item={item.ingredient} />
                  <p className="text text_type_main-default ml-4">
                    {item.ingredient.name}
                  </p>
                </div>
                <div className="flex">
                  <span className="text text_type_digits-default mr-2">{`${item.count} x ${item.ingredient.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <span className="text text_type_main-default text_color_inactive">
          {getTime(createdAt)}
        </span>
        <div className="flex">
          <CurrencyIcon type="primary" />
          <span className="text text_type_digits-default ml-2">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
