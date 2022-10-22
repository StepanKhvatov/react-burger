import { useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateProfile } from "../../services/actions/user";
import { selectUser } from "../../services/selectors/user";
import EditInput from "../edit-input/edit-input";

type TProfileFormValues = {
  name: string;
  email: string;
  password: string;
};

const ProfileForm = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const [form, setValue] = useState<TProfileFormValues>({
    name: user?.name || "",
    email: user?.email || "",
    password: "******",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(updateProfile(form));
  };

  const onReset = () => {
    setValue({ ...form, email: user?.email || "", name: user?.name || "" });
  };

  const isFormCaanged = user?.name !== form.name || user.email !== form.email;

  return (
    <form onSubmit={onSubmit} className="form-container">
      <EditInput
        value={form.name}
        onChange={onChange}
        type="text"
        placeholder="Имя"
        name="name"
        error={false}
        errorText="Ошибка"
      />
      <EditInput
        value={form.email}
        onChange={onChange}
        type="email"
        placeholder="Логин"
        name="email"
        error={false}
        errorText="Ошибка"
      />
      <EditInput
        value={form.password}
        type="text"
        placeholder="Пароль"
        name="password"
        error={false}
        errorText="Ошибка"
        onChange={() => undefined}
        disableEdit
      />
      {isFormCaanged && (
        <div className="flex justify-end w-full items-center">
          <button
            onClick={onReset}
            type="button"
            className="text text-main-default mr-5"
          >
            Отмена
          </button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
