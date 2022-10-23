import { FC, ReactNode } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { selectUser } from "../../services/selectors/user";

const ProtectedRoute: FC<RouteProps & { children?: ReactNode }> = ({
  children,
  path,
  exact,
}) => {
  const user = useAppSelector(selectUser);

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
