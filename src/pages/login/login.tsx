import { FC } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form";
import { useAppSelector } from "../../services/store";
import { selectUser } from "../../services/selectors/user";

type TLocationState = {
  from?: string;
};

const LoginPage: FC = () => {
  const location = useLocation<TLocationState>();

  const user = useAppSelector(selectUser);

  if (user) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <section className="container container_location-auth pt-10 pb-10 pr-5 pl-5">
      <h4 className="text text_type_main-medium mb-6">Вход</h4>
      <LoginForm />
      <div className="mt-20 flex flex-col items-center">
        <div className="flex items-center">
          <p className="text_type_main-default text_color_inactive mr-3">
            Вы — новый пользователь?
          </p>
          <Link to="/register" className="text text_type_main-default">
            Зарегистрироваться
          </Link>
        </div>
        <div className="flex items-center">
          <p className="text_type_main-default text_color_inactive mr-3">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className="text text_type_main-default">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
