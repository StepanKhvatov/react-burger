import { FC } from "react";
import { data } from "../../utils/orders-data";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import OrderCard from "../../components/order-card/order-card";

const FeedPage: FC = () => {
  const { orders, total, totalToday } = data;

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <main className="container__grid-content">
        <div
          className={`container__scroll-content ${customScrollbarStyles["custom-scrollbar"]} pr-5`}
        >
          {orders.map((item) => {
            return <OrderCard key={item._id} item={item} />;
          })}
        </div>
      </main>
    </section>
  );
};

export default FeedPage;
