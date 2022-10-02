import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { selectUser } from "../../services/selectors/user";
import { FC } from "react";

type TProtectedRouteProps = {
  path: string;
  exact: boolean;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({
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
