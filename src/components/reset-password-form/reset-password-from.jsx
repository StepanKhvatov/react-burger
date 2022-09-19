import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PasswordInput from "../password-input/password-input";
import { resetPassword } from "../../services/actions/user";

const ResetPasswordForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(resetPassword(form)).then((res) => {
      if (res?.payload?.success) {
        history.replace({ pathanme: "/login" });
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
