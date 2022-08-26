import { useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/actions/order";
import {
  selectIngredientsTotal,
  selectOrderIngredientsIds,
} from "../../services/selectors/ingredients-constructor";

const BurgerConstructorFooter = () => {
  const dispatch = useDispatch();

  const total = useSelector(selectIngredientsTotal);

  const orderIngredientsIds = useSelector(selectOrderIngredientsIds);

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const onSumbit = () => {
    dispatch(createOrder(orderIngredientsIds)).then((res) => {
      if (res.payload.number) {
        setOrderModalOpen(true);
      }

      return res;
    });
  };

  return (
    <div className={`${burgerConstructorStyles["cunstructor-footer"]}`}>
      <div
        className={`${burgerConstructorStyles["total-price-container"]} mr-10`}
      >
        <span className="text text_type_digits-medium">{total}</span>
        <CurrencyIcon width={50} type="primary" />
      </div>
      <Button
        disabled={!orderIngredientsIds.length}
        type="primary"
        size="large"
        onClick={onSumbit}
      >
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
