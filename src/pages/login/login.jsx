import { Link, Redirect } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/selectors/user";

const LoginPage = () => {
  const user = useSelector(selectUser);

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
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
