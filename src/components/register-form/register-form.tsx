import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../../services/store";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { register } from "../../services/actions/user";

type TRegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const initialFormValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [form, setValue] = useState<TRegisterFormValues>(initialFormValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(register(form)).then((res) => {
      if (res.payload.success) {
        history.replace({ pathname: "/" });
      }
    });
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
