import { Link, Redirect } from "react-router-dom";
import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/selectors/user";

const ForgotPasswordPage = () => {
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
    <section className="container container_location-auth pt-10 pb-10 pr-5 pl-5">
      <h4 className="text text_type_main-medium mb-6">Восстановление пароля</h4>
      <ForgotPasswordForm />
      <div className="mt-20 flex items-center">
        <p className="text_type_main-default text_color_inactive mr-3">
          Вспомнили пароль?
        </p>
        <Link to="/login" className="text text_type_main-default">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
