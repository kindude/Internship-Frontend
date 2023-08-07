// Input.tsx
import React from "react";

interface InputProps {
  htmlFor: string;
  text: string;
  type: string;
  id: string;
  name: string;
  accept: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop
}

const Input: React.FC<InputProps> = ({
  htmlFor,
  text,
  type,
  id,
  name,
  accept,
  onChange, // Make sure to include it in the destructuring
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{text}</label>
      <input type={type} id={id} name={name} accept={accept} onChange={onChange} />
    </div>
  );
};

export default Input;
