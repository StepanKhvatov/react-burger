import { Link, Redirect } from "react-router-dom";
import ResetPasswordForm from "../../components/reset-password-form/reset-password-from";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/selectors/user";

const ResetPasswordPage = () => {
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
      <h4 className="text text_type_main-medium mb-6">Восстановление пароля</h4>
      <ResetPasswordForm />
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

export default ResetPasswordPage;
