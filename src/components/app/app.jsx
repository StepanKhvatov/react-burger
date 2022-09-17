import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

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
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route path="/ingredients/:ingredientId" exact>
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
      </Switch>
    </div>
  );
};

export default App;
