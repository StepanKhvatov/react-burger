import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import ProfileForm from "../../components/profile-form/profile-form";
import NavigationLink from "../../components/navigation-link/navigation-link";
import { data } from "../../utils/orders-data";
import OrderCard from "../../components/order-card/order-card";
import customScrollbarStyles from "../../styles/custom-scrollbar.module.css";
import profilePageStyles from "./profile.module.css";
import { logout } from "../../services/actions/user";

const ProfilePage: FC = () => {
  const { orders } = data;

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <div className={`${profilePageStyles.content} flex items-start`}>
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
        <Switch>
          <Route path="/profile" exact>
            <ProfileForm />
          </Route>
          <Route path="/profile/orders">
            <div
              className={`container__scroll-content ${customScrollbarStyles["custom-scrollbar"]} pr-5`}
            >
              {orders.map((item) => {
                return <OrderCard key={item._id} item={item} />;
              })}
            </div>
          </Route>
        </Switch>
      </div>
    </section>
  );
};

export default ProfilePage;
