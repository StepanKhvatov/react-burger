import { NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import navigationLinkStyles from "./navigation-link.module.css";
import PropTypes from "prop-types";

const iconsByName = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon,
};

const NavigationLink = ({ icon = "burger", title, to = "/", classes = "" }) => {
  const Icon = iconsByName[icon];

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${navigationLinkStyles.link} text text_type_main-default ${classes} ${
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

NavigationLink.propTypes = {
  icon: PropTypes.oneOf(["burger", "list", "profile"]).isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default NavigationLink;
