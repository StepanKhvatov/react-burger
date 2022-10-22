import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { selectIngredientsByIds } from "../../services/selectors/ingredients";
import { setViewedOrderComponent } from "../../services/actions/viewed-order";
import { selectOrderTotal } from "../../services/selectors/order";
import IngredientsRow from "../ingredients-row/ingredients-row";
import { getTime } from "../../utils/date";
import { localaizedStatuses } from "../../utils/constants";
import type { TOrder } from "../../types";
import orderCardStyles from "./order-card.module.css";

type TOrderCardProps = {
  item: TOrder;
  withStatus?: boolean;
  isUserOrder?: boolean;
};

const OrderCard: FC<TOrderCardProps> = ({
  item,
  withStatus = false,
  isUserOrder,
}) => {
  const { ingredients, name, status, number, createdAt, _id } = item;

  const history = useHistory();

  const dispatch = useAppDispatch();

  const storeIngredients = useAppSelector((store) =>
    selectIngredientsByIds(store, ingredients)
  );

  const total = useAppSelector((store) => selectOrderTotal(store, item));

  const onOrderClick = () => {
    dispatch(setViewedOrderComponent("modal"));

    history.replace({
      pathname: `/${isUserOrder ? "profile/orders" : "feed"}/${_id}`,
    });
  };

  return (
    <article
      onClick={onOrderClick}
      className={`${orderCardStyles.container} mb-4 p-6`}
    >
      <div className="flex justify-between mb-6">
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {getTime(createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <h4 className="text text_type_main-medium mb-2">{name}</h4>
        {withStatus && (
          <p
            className={`text text_type_main-default ${
              status === "done" ? "text_color_success" : ""
            }`}
          >
            {localaizedStatuses[status]}
          </p>
        )}
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
