import { useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";

const ORDER_ID = 1234536;

const BurgerConstructorFooter = ({ state }) => {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        console.log("res", res);
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
      {isOrderModalOpen && (
        <Modal
          isOpen={isOrderModalOpen}
          onClose={() => setOrderModalOpen(false)}
        >
          <OrderDetails orderId={ORDER_ID} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorFooter;
