import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/actions/user";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(resetPassword(form));
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <Input
        value={form.email}
        onChange={onChange}
        type="text"
        placeholder="Введите новый пароль"
        name="password"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Input
        value={form.password}
        onChange={onChange}
        type="text"
        placeholder="Введите код из письма"
        name="code"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Button htmlType="submit">Сохранить</Button>
    </form>
  );
};

export default ResetPasswordForm;
