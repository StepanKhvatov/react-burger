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

const NavigationLink = ({
  icon,
  title,
  to = "/",
  classes = "",
  exact = false,
}) => {
  const Icon = iconsByName[icon];

  return (
    <NavLink
      exact={exact}
      to={to}
      activeClassName={navigationLinkStyles.link_active}
      className={`${navigationLinkStyles.link} text  ${classes}`}
    >
      {typeof Icon === "function" && <Icon type={"secondary"} />}
      {title}
    </NavLink>
  );
};

NavigationLink.propTypes = {
  icon: PropTypes.oneOf(["burger", "list", "profile"]),
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default NavigationLink;
