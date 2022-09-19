import { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const PasswordInput = ({
  value,
  onChange,
  errorText,
  error,
  name,
  placeholder,
}) => {
  const [type, setType] = useState("password");

  const onIconClick = () => {
    if (type === "password") {
      return setType("text");
    }

    setType("password");
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      icon={type === "text" ? "HideIcon" : "ShowIcon"}
      onIconClick={onIconClick}
      name={name}
      error={error}
      errorText={errorText}
      size="default"
    />
  );
};

export default PasswordInput;
