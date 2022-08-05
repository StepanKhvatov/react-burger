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

const NavigationLink = ({ icon = "burger", title, to = "/" }) => {
  const Icon = iconsByName[icon];

  return (
    <NavLink to="/" className={navigationLinkStyles.link}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          {title}
        </>
      )}
    </NavLink>
  );
};

export default NavigationLink;
