import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { login } from "../../services/actions/user";

const LoginForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(login(form)).then((res) => {
      if (res.payload.success) {
        history.replace({ pathname: "/" });
      }
    });
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
      <PasswordInput
        value={form.password}
        onChange={onChange}
        name="password"
        placeholder="Пароль"
        error={false}
        errorText="Ошибка"
      />
      <Button htmlType="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
