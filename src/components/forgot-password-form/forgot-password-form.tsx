import { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/user";

const ForgotPasswordForm = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [form, setValue] = useState<{ email: string }>({ email: "" });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(forgotPassword(form)).then((res) => {
      if (res.payload.success) {
        history.replace({
          pathname: "/reset-password",
          state: { from: history.location },
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
