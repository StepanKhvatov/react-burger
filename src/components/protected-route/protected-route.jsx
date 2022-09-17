import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectUser } from "../../services/selectors/user";

const ProtectedRoute = ({ children, path, exact }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};
