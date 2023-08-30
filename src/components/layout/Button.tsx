import React from 'react';
import "../../styles/Button.css";

export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
  }




const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, type, text, disabled=false} = props;
  return (
    <div>
      <button type={type} onClick={onClick} disabled={disabled}>{props.text}</button>
    </div>
  );
};

export default Button;
