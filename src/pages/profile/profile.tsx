import { FC, useEffect, useMemo } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectViewedOrderComponent } from "../../services/selectors/viewed-order";
import ProfileForm from "../../components/profile-form/profile-form";
import NavigationLink from "../../components/navigation-link/navigation-link";
import OrderCard from "../../components/order-card/order-card";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import profilePageStyles from "./profile.module.css";
import { logout } from "../../services/actions/user";
import {
  userFeedWsConnectionStart,
  userFeedWsConnectionEnd,
} from "../../services/actions/user-orders";
import OrderPage from "../order/order-page";
import Loader from "../../components/loader/loader";

const ProfilePage: FC = () => {
  const location = useLocation();

  const { wsConnected, messages } = useAppSelector((store) => store.userOrders);

  const viewedOrderComponent = useAppSelector(selectViewedOrderComponent);

  const { orders = [] } = messages[0] || {};

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(userFeedWsConnectionStart());

    return () => {
      dispatch(userFeedWsConnectionEnd());
    };
  }, [dispatch]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      return b.number - a.number;
    });
  }, [orders]);

  const isOrderPage =
    location.pathname.includes("/profile/orders/") &&
    viewedOrderComponent === "page";

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <div className={`${profilePageStyles.content} flex items-start`}>
        {!isOrderPage && (
          <div
            className={`${profilePageStyles.navigation} flex flex-col items-start`}
          >
            <NavigationLink
              exact
              to="/profile"
              title="Профиль"
              classes="text_type_main-medium"
            />
            <NavigationLink
              exact
              to="/profile/orders"
              title="История заказов"
              classes="text_type_main-medium"
            />
            <button
              onClick={handleLogout}
              type="button"
              className="text text_type_main-medium text_color_inactive"
            >
              Выход
            </button>
            <p
              className={`${profilePageStyles.description} text text_type_main-default text_color_inactive mt-10`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        )}
        <Switch>
          <Route path="/profile" exact>
            <ProfileForm />
          </Route>
          <Route path="/profile/orders" exact={viewedOrderComponent === "page"}>
            {wsConnected && messages.length ? (
              <div
                className={`container__scroll-content ${customScrollbarStyles["custom-scrollbar"]} w-full pr-5`}
              >
                {sortedOrders.map((item) => {
                  return (
                    <OrderCard
                      key={item._id}
                      item={item}
                      withStatus
                      isUserOrder
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <Loader />
              </div>
            )}
            <Route path="/profile/orders/:id">
              <OrderPage isProfileLocation />
            </Route>
          </Route>
          <Route path="/profile/orders/:id">
            <OrderPage isProfileLocation />
          </Route>
        </Switch>
      </div>
    </section>
  );
};

export default ProfilePage;
