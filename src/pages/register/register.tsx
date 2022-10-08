import { FC } from "react";
import { Link, Redirect } from "react-router-dom";
import RegisterForm from "../../components/register-form/register-form";
import { useAppSelector } from "../../services/store";
import { selectUser } from "../../services/selectors/user";

const RegisterPage: FC = () => {
  const user = useAppSelector(selectUser);

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
      <h4 className="text text_type_main-medium mb-6">Регистрация</h4>
      <RegisterForm />
      <div className="mt-20 flex items-center">
        <p className="text_type_main-default text_color_inactive mr-3">
          Уже зарегистрированы?
        </p>
        <Link to="/login" className="text text_type_main-default">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default RegisterPage;
