import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = event.target;
  };

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <h4 className="text text_type_main-medium mb-6">Вход</h4>
      <form className="form-container" onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="E-mail"
          name="email"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="text"
          placeholder="Пароль"
          name="password"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <Button htmlType="submit">Войти</Button>
      </form>
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
