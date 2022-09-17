import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateProfile } from "../../services/actions/user";
import { selectUser } from "../../services/selectors/user";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [form, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });
  const [formChanged, setFormChanged] = useState(false);

  const onChange = (e) => {
    if (!formChanged) {
      setFormChanged(true);
    }

    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(updateProfile(form));
  };

  const onReset = () => {
    setFormChanged(false);
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <Input
        value={form.name}
        onChange={onChange}
        type="text"
        placeholder="Имя"
        name="name"
        error={false}
        errorText="Ошибка"
        size="default"
        icon="EditIcon"
      />
      <Input
        value={form.email}
        onChange={onChange}
        type="email"
        placeholder="Логин"
        name="email"
        error={false}
        errorText="Ошибка"
        size="default"
        icon="EditIcon"
      />
      <Input
        value={form.password}
        onChange={onChange}
        type="text"
        placeholder="Пароль"
        name="password"
        error={false}
        errorText="Ошибка"
        size="default"
        icon="EditIcon"
      />
      {formChanged && (
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
