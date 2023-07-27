import React, { ChangeEvent, FocusEvent } from "react";
import { useField } from "formik";

interface InputProps {
  htmlFor: string;
  text: string;
  id: string;
  name: string;
  type: string;
  accept?: string;
}

const Input: React.FC<InputProps> = ({ htmlFor, text, id, name, type, accept }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={htmlFor}>{text}</label>
      <input
        type={type}
        id={id}
        name={name}
        required
        accept={accept}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
    </div>
  );
};

export default Input;
