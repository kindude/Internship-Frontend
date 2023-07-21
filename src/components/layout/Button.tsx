import React from 'react';


export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
  }


 // Button.tsx

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <div>
      <button type={props.type}>{props.text}</button>
    </div>
  );
};

export default Button;
