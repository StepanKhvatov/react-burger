import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { createOrder, clearOrderState } from "../../services/actions/order";
import {
  selectIngredientsTotal,
  selectOrderIngredientsIds,
} from "../../services/selectors/ingredients-constructor";
import { selectUser } from "../../services/selectors/user";
import { useAppDispatch, useAppSelector } from "../../services/store";

const BurgerConstructorFooter = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const total = useAppSelector(selectIngredientsTotal);

  const orderIngredientsIds = useAppSelector(selectOrderIngredientsIds);

  const [isOrderModalOpen, setOrderModalOpen] = useState<boolean>(false);

  const onSumbit = () => {
    if (user) {
      return dispatch(createOrder(orderIngredientsIds)).then((res) => {
        if (res?.payload?.number) {
          setOrderModalOpen(true);
        }

        return res;
      });
    }

    history.replace({ pathname: "/login", state: { from: history.location } });
  };

  return (
    <div className={`${burgerConstructorStyles["cunstructor-footer"]}`}>
      <div
        className={`${burgerConstructorStyles["total-price-container"]} mr-10`}
      >
        <span className="text text_type_digits-medium">{total}</span>
        <CurrencyIcon type="primary" />
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
          onClose={() => {
            setOrderModalOpen(false);
            dispatch(clearOrderState());
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorFooter;
