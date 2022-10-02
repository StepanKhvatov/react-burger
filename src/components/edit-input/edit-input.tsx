import { useState, useRef, FC, ChangeEvent } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

type TEditInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email" | "password";
  placeholder: string;
  name: string;
  error?: boolean;
  errorText?: string;
  disableEdit?: boolean;
};

const EditInput: FC<TEditInputProps> = ({
  value,
  onChange,
  type,
  placeholder,
  name,
  error,
  errorText,
  disableEdit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState<boolean>(true);

  const onIconClick = () => {
    if (disabled && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
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
      icon={!disableEdit ? "EditIcon" : undefined}
      onIconClick={onIconClick}
      onBlur={() => setDisabled(true)}
    />
  );
};

export default EditInput;
