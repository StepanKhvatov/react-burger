import { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import profilePageStyles from "./profile.module.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = event.target;
  };

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
            to="/orders"
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
        <form onSubmit={onSubmit} className="form-container">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Имя"
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            icon="EditIcon"
          />
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="Логин"
            name="email"
            error={false}
            errorText="Ошибка"
            size="default"
            icon="EditIcon"
          />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="text"
            placeholder="Пароль"
            name="password"
            error={false}
            errorText="Ошибка"
            size="default"
            icon="EditIcon"
          />
        </form>
      </div>
      <Switch>
        <Route path="/profile" exact></Route>
      </Switch>
    </section>
  );
};

export default ProfilePage;
