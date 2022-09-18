import { useState, useRef } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const EditInput = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  error,
  errorText,
  disableEdit,
}) => {
  const inputRef = useRef(null);

  const [disabled, setDisabled] = useState(true);

  const onIconClick = () => {
    if (disabled && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }

    setDisabled(!disabled);
  };

  return (
    <Input
      ref={inputRef}
      disabled={disabled}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      name={name}
      error={error}
      errorText={errorText}
      size="default"
      icon={!disableEdit && "EditIcon"}
      onIconClick={onIconClick}
      onBlur={() => setDisabled(true)}
    />
  );
};

export default EditInput;
