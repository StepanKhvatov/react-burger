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
    <NavLink
      to="/"
      className={({ isActive }) =>
        `${navigationLinkStyles.link} text text_type_main-default ${
          isActive ? "" : "text_color_inactive"
        }`
      }
    >
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
