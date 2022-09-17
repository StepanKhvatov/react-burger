import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/selectors/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../services/actions/user";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector(selectUser);

  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser()).then(() => {
      setUserLoaded(true);
    });
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
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
