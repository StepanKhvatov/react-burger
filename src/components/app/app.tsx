import { useEffect, useState, FC } from "react";
import { Switch, Route } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { selectViewedIngredientComponent } from "../../services/selectors/viewed-ingredient";
import { getUser } from "../../services/actions/user";
import { getIngredients } from "../../services/actions/ingredients";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../../pages/constuctor/constructor";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredient/ingredient-page";
import NotFountPage from "../../pages/not-found/not-found";
import FeedPage from "../../pages/feed/feed";
import ProtectedRoute from "../protected-route/protected-route";
import { useAppDispatch } from "../../services/store";

const App: FC = () => {
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const viewedComponent = useAppSelector(selectViewedIngredientComponent);

  useEffect(() => {
    dispatch(getUser()).finally(() => {
      setUserLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Switch>
        <Route path="/" exact={viewedComponent === "page"}>
          <ConstructorPage />
          <Route path="/ingredients/:ingredientId">
            <IngredientPage />
          </Route>
        </Route>
        <Route path="/ingredients/:ingredientId">
          <IngredientPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={false}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route path="*">
          <NotFountPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
