import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/user";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(forgotPassword(form));
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <Input
        value={form.email}
        onChange={onChange}
        type="email"
        placeholder="Укажите e-mail"
        name="email"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Button htmlType="submit">Восстановить</Button>
    </form>
  );
};

export default ForgotPasswordForm;
