import { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/store";
import {
  setViewedOrder,
  removeViewedOrder,
} from "../../services/actions/viewed-order";
import { selectViewedOrderComponent } from "../../services/selectors/viewed-order";
import { selectOrderById } from "../../services/selectors/order";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import OrderInfo from "../../components/order-info/order-info";

type TOrderPageProps = {
  isProfileLocation?: boolean;
};

const OrderPage: FC<TOrderPageProps> = ({ isProfileLocation = false }) => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const { id: orderId } = useParams<{ id: string }>();

  const { wsConnected, messages } = useAppSelector((store) =>
    isProfileLocation ? store.userOrders : store.feedOrders
  );

  const order = useAppSelector((store) =>
    selectOrderById(store, orderId, isProfileLocation)
  );

  const viewedOrderComponent = useAppSelector(selectViewedOrderComponent);

  useEffect(() => {
    if (order) {
      dispatch(setViewedOrder(order));

      return () => {
        dispatch(removeViewedOrder());
      };
    }
  }, [order, dispatch, history]);

  const onCloseModal = () => {
    history.replace({
      pathname: isProfileLocation ? "/profile/orders" : `/feed`,
    });
  };

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      {wsConnected && messages.length ? (
        viewedOrderComponent === "modal" ? (
          <Modal isOpen={true} onClose={onCloseModal}>
            <OrderInfo forModal />
          </Modal>
        ) : (
          <OrderInfo />
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default OrderPage;
