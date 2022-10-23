import { useState, ChangeEvent, FC, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { login } from "../../services/actions/user";
import { useAppDispatch } from "../../services/store";

type TLoginFormValues = {
  email: string;
  password: string;
};

const initialFormValues = { email: "", password: "" };

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [form, setValue] = useState<TLoginFormValues>(initialFormValues);
  const [errors, setErrors] = useState<TLoginFormValues>(initialFormValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors(initialFormValues);

    setValue({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
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
        error={Boolean(errors.password)}
        errorText={errors.password}
      />
      <Button htmlType="submit">Войти</Button>
    </form>
  );
};

export default LoginForm;
