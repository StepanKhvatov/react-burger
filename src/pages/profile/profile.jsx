import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfileForm from "../../components/profile-form/profile-form";
import NavigationLink from "../../components/navigation-link/navigation-link";
import profilePageStyles from "./profile.module.css";
import { logout } from "../../services/actions/user";

const ProfilePage = () => {
  const dispatch = useDispatch();

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
        </Switch>
      </div>
    </section>
  );
};

export default ProfilePage;
