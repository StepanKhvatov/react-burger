import { FC } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

const AppHeader: FC = () => {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.container}>
        <ul className={appHeaderStyles["links-container"]}>
          <li>
            <NavigationLink
              title="Конструктор"
              to="/"
              icon="burger"
              exact
              classes="text_type_main-default"
            />
          </li>
          <li>
            <NavigationLink
              title="Лента заказов"
              to="/orders"
              icon="list"
              exact
              classes="text_type_main-default"
            />
          </li>
        </ul>
        <div className={appHeaderStyles["logo-container"]}>
          <Logo />
        </div>
        <NavigationLink
          title="Личный кабинет"
          to="/profile"
          icon="profile"
          classes={`${appHeaderStyles["profile-link"]} text_type_main-default`}
        />
      </div>
    </header>
  );
};

export default AppHeader;
