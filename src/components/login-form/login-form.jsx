import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { login } from "../../services/actions/user";

const initialFormValues = { email: "", password: "" };

const LoginForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setValue] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const onChange = (e) => {
    setErrors(initialFormValues);

    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(login(form))
      .then((res) => {
        if (res?.payload.success) {
          history.replace({ pathname: "/" });
        }
      })
      .catch((error) => {
        if (error.message === "email or password are incorrect") {
          setErrors({
            ...errors,
            password: "Email или пароль неверны",
          });
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
        error={errors.password}
        errorText={errors.password}
      />
      <Button htmlType="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
