// LogoutButton.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button, { ButtonProps } from "./Button";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC<ButtonProps> = ({ onClick, ...rest }) => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/welcome");
  };

  return <Button onClick={handleLogout} {...rest} />;
};

export default LogoutButton;
