import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../../services/store";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { resetPassword } from "../../services/actions/user";

type TResetPasswordFormValues = {
  password: string;
  token: string;
};

const ResetPasswordForm: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [form, setValue] = useState<TResetPasswordFormValues>({
    password: "",
    token: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(resetPassword(form)).then((res) => {
      if (res?.payload?.success) {
        history.replace({ pathname: "/login" });
      }
    });
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <PasswordInput
        value={form.password}
        onChange={onChange}
        placeholder="Введите новый пароль"
        name="password"
        error={false}
        errorText="Ошибка"
      />
      <Input
        value={form.token}
        onChange={onChange}
        type="text"
        placeholder="Введите код из письма"
        name="token"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Button htmlType="submit">Сохранить</Button>
    </form>
  );
};

export default ResetPasswordForm;
