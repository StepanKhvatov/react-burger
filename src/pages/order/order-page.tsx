import { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/store";
import {
  setViewedOrder,
  removeViewedOrder,
  setViewedOrderComponent,
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
  }, [order, dispatch]);

  const onCloseModal = () => {
    history.replace({
      pathname: isProfileLocation ? "/profile/orders" : `/feed`,
    });

    dispatch(setViewedOrderComponent("page"));
  };

  if (!wsConnected || !messages.length) {
    return <Loader />;
  }

  if (viewedOrderComponent === "modal") {
    return (
      <Modal isOpen={true} onClose={onCloseModal}>
        <OrderInfo forModal />
      </Modal>
    );
  } else {
    return <OrderInfo />;
  }
};

export default OrderPage;
