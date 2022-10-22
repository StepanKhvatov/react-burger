import { FC, useMemo, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import OrderCard from "../../components/order-card/order-card";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  feedWsConnectionStart,
  feedWsConnectionEnd,
} from "../../services/actions/feed-orders";
import OrdersListColumn from "../../components/orders-list-column/orders-list-column";
import Loader from "../../components/loader/loader";
import OrderPage from "../order/order-page";
import { TOrder } from "../../types";

const FeedPage: FC = () => {
  const { wsConnected, messages } = useAppSelector((store) => store.feedOrders);

  const { orders = [], total = 0, totalToday = 0 } = messages[0] || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feedWsConnectionStart());

    return () => {
      dispatch(feedWsConnectionEnd());
    };
  }, [dispatch]);

  const { doneOrders, inWorkOrders } = useMemo(() => {
    return orders.reduce(
      (acc, item) => {
        const key = item.status === "done" ? "doneOrders" : "inWorkOrders";

        return {
          ...acc,
          [key]: [...acc[key], item],
        };
      },
      { doneOrders: [], inWorkOrders: [] } as {
        doneOrders: ReadonlyArray<TOrder>;
        inWorkOrders: ReadonlyArray<TOrder>;
      }
    );
  }, [orders]);

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <Switch>
        <Route path="/feed" exact>
          <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
          {wsConnected && messages.length ? (
            <main className="container__grid-content">
              <div
                className={`container__scroll-content ${customScrollbarStyles["custom-scrollbar"]} ${customScrollbarStyles["custom-scrollbar_direction-vertical"]} pr-5`}
              >
                {orders.map((item) => {
                  return <OrderCard key={item._id} item={item} />;
                })}
              </div>
              <div className="w-full flex flex-col">
                <div className="flex flex-row w-full mb-15">
                  <OrdersListColumn
                    title="Готовы:"
                    orders={doneOrders}
                    classes="mr-9"
                    isOrdersReady
                  />
                  <OrdersListColumn title="В работе:" orders={inWorkOrders} />
                </div>
                <div className="flex flex-col mb-15">
                  <h3 className="text text_type_main-medium">
                    Выполнено за все время:
                  </h3>
                  <span className="text text_type_digits-large">{total}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text text_type_main-medium">
                    Выполнено за сегодня:
                  </h3>
                  <span className="text text_type_digits-large">
                    {totalToday}
                  </span>
                </div>
              </div>
            </main>
          ) : (
            <Loader />
          )}
        </Route>
        <Route path="/feed/:id">
          <OrderPage />
        </Route>
      </Switch>
    </section>
  );
};

export default FeedPage;
