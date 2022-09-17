import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { register } from "../../services/actions/user";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(register(form));
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <Input
        value={form.name}
        onChange={onChange}
        type="text"
        placeholder="Имя"
        name="name"
        error={false}
        errorText="Ошибка"
        size="default"
      />
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
      <Button htmlType="submit">Зарегистрироваться</Button>
    </form>
  );
};

export default RegisterForm;
