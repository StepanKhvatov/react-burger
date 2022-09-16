import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const { password, code } = event.target;
  };

  return (
    <section className="container pt-10 pb-10 pr-5 pl-5">
      <h4 className="text text_type_main-medium mb-6">Восстановление пароля</h4>
      <form className="form-container" onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="Введите новый пароль"
          name="password"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="text"
          placeholder="Введите код из письма"
          name="code"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <Button htmlType="submit">Сохранить</Button>
      </form>
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
