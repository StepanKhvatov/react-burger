import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/selectors/user";

const ProtectedRoute = ({ children, to, exact }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      to={to}
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
