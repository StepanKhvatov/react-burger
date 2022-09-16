import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(login(form));
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <Input
        value={form.email}
        onChange={onChange}
        type="email"
        placeholder="E-mail"
        name="email"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Input
        value={form.password}
        onChange={onChange}
        type="text"
        placeholder="Пароль"
        name="password"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Button htmlType="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
