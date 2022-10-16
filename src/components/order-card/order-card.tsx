import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store";
import { selectIngredientsByIds } from "../../services/selectors/ingredients";
import IngredientsRow from "../ingredients-row/ingredients-row";
import type { TOrder } from "../../types";
import orderCardStyles from "./order-card.module.css";

type TOrderCardProps = {
  item: TOrder;
};

const OrderCard: FC<TOrderCardProps> = ({ item }) => {
  const { ingredients, name, status, number, createdAt } = item;

  const storeIngredients = useAppSelector((store) =>
    selectIngredientsByIds(store, ingredients)
  );

  const total = useMemo(() => {
    return storeIngredients.reduce((acc, item) => {
      if (item?.price) {
        return acc + item.price;
      }

      return acc;
    }, 0);
  }, [storeIngredients]);

  return (
    <article className={`${orderCardStyles.container} mb-4 p-6`}>
      <div className="flex justify-between mb-6">
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {createdAt}
        </span>
      </div>
      <div className="mb-6">
        <h4 className="text text_type_main-medium">{name}</h4>
      </div>
      <div className="flex justify-between items-center">
        <IngredientsRow items={storeIngredients} />
        <div className="flex">
          <span className="text text_type_digits-default mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
