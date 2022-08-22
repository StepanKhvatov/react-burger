import { useContext, useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { OrdersContext } from "../../services/ordersContext";
import { checkResponse } from "../../utils/api";

const BurgerConstructorFooter = ({ state }) => {
  const [orders, setOrders] = useContext(OrdersContext);

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const onSumbit = () => {
    const bunId = state.bun._id;

    const mainIngredientsIds = state.unblocked.map((item) => item._id);

    const ingredientsIds = [...mainIngredientsIds, bunId, bunId];

    fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          setOrders([res.order, ...orders]);
          setOrderModalOpen(true);
        }

        return res;
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error?.message || error);
      });
  };

  return (
    <div className={`${burgerConstructorStyles["cunstructor-footer"]} mt-10`}>
      <div
        className={`${burgerConstructorStyles["total-price-container"]} mr-10`}
      >
        <span className="text text_type_digits-medium">{state.total}</span>
        <CurrencyIcon width={50} type="primary" />
      </div>
      <Button type="primary" size="large" onClick={onSumbit}>
        Оформить заказ
      </Button>
      {isOrderModalOpen && orders[0].number && (
        <Modal
          isOpen={isOrderModalOpen}
          onClose={() => setOrderModalOpen(false)}
        >
          <OrderDetails orderId={orders[0].number} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorFooter;
