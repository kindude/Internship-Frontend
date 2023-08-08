import React, { ChangeEvent, FocusEvent } from "react";
import { useField } from "formik";
import { boolean } from "yargs";


interface InputProps {
  htmlFor: string;
  text: string;
  id: string;
  name: string;
  type: "text" | "checkbox" | "password" | "email" | "file";
  accept?: string;
  value?: string | boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ htmlFor, text, id, name, type, accept, value, checked, onChange, ...rest }) => {
  return (
    <div>
      {type === "checkbox" ? (
        <label htmlFor={htmlFor}>
          {text}
          <input type="checkbox" id={id} name={name} accept={accept} checked={checked || false} onChange={onChange} {...rest} />
        </label>
      ) : (
        <div>
          <label htmlFor={htmlFor}>{text}</label>
          <input type={type} id={id} name={name} accept={accept} value={value as string} onChange={onChange} {...rest} />
        </div>
      )}
    </div>
  );
};

export default Input;




