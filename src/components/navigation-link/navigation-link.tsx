import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import navigationLinkStyles from "./navigation-link.module.css";

const iconsByName = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon,
};

type TNavigationLinkProps = {
  icon?: keyof typeof iconsByName;
  title: string;
  to?: string;
  classes?: string;
  exact?: boolean;
};

const NavigationLink: FC<TNavigationLinkProps> = ({
  icon,
  title,
  to = "/",
  classes = "",
  exact = false,
}) => {
  const Icon = icon ? iconsByName[icon] : undefined;

  return (
    <NavLink
      exact={exact}
      to={to}
      activeClassName={navigationLinkStyles.link_active}
      className={`${navigationLinkStyles.link} text  ${classes}`}
    >
      {typeof Icon === "function" && <Icon type="secondary" />}
      {title}
    </NavLink>
  );
};

export default NavigationLink;
