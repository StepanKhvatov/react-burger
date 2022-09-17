import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearOrderState } from "../../services/actions/order";
import {
  selectIngredientsTotal,
  selectOrderIngredientsIds,
} from "../../services/selectors/ingredients-constructor";
import { selectUser } from "../../services/selectors/user";

const BurgerConstructorFooter = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const total = useSelector(selectIngredientsTotal);

  const orderIngredientsIds = useSelector(selectOrderIngredientsIds);

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

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
