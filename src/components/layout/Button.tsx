import React from 'react';


export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    onClick?: () => void;
    className?: string;
  }


 // Button.tsx

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, type, text,  } = props;
  return (
    <div>
      <button type={type} onClick={onClick}>{props.text}</button>
    </div>
  );
};

export default Button;
