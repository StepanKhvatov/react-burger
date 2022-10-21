import { FC } from "react";
import styles from "./orders-list-column.module.css";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import { TOrder } from "../../types";

type TOrdersListColumnProps = {
  readonly orders: ReadonlyArray<TOrder>;
  readonly title: string;
  readonly classes?: string;
  readonly isOrdersReady?: boolean;
};

const OrdersListColumn: FC<TOrdersListColumnProps> = ({
  orders,
  title,
  classes = "",
  isOrdersReady = false,
}) => {
  return (
    <div className={`${styles.column}  flex flex-col ${classes}`}>
      <h3 className="text text_type_main-medium mb-5">{title}</h3>
      <ul
        className={`${styles["orders-column"]} ${isOrdersReady ? styles["orders-column_orders-ready"] : ""} ${customScrollbarStyles["custom-scrollbar"]} ${customScrollbarStyles["custom-scrollbar_direction-horizontal"]}`}
      >
        {orders.map((item) => {
          return (
            <li key={item._id} className="text text_type_digits-default">
              {item.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersListColumn;
