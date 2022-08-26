import { useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { useDispatch } from "react-redux";
import { createOrder } from "../../services/actions/order";

const BurgerConstructorFooter = ({ state }) => {
  const dispatch = useDispatch();

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const onSumbit = () => {
    const bunId = state.bun._id;

    const mainIngredientsIds = state.unblocked.map((item) => item._id);

    const ingredientsIds = [...mainIngredientsIds, bunId, bunId];

    dispatch(createOrder(ingredientsIds)).then((res) => {
      if (res.payload.number) {
        setOrderModalOpen(true);
      }

      return res;
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
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorFooter;
