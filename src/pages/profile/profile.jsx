import { Switch, Route, NavLink } from "react-router-dom";
import ProfileForm from "../../components/profile-form/profile-form";
import profilePageStyles from "./profile.module.css";

const ProfilePage = () => {
  const handleLogout = () => {};

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <div className={`${profilePageStyles.content} flex items-start`}>
        <div
          className={`${profilePageStyles.navigation} flex flex-col items-start`}
        >
          <NavLink
            to="/profile"
            className="text text_type_main-medium text_color_inactive"
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className="text text_type_main-medium text_color_inactive"
          >
            История заказов
          </NavLink>
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
