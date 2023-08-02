
import { StringState } from "../reducers/slice"; // Assuming you have exported StringState from stringSlice
import { RouteProps } from "react-router-dom";
import React, { useState, useEffect,ReactNode } from 'react';


export interface RootState {
  user: StringState; 
}


type PrivateRouteProps = RouteProps & {
  children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = localStorage.getItem("user") ?? "";
  const [access, setAccess] = useState(false); // Initialize access state as false

  useEffect(() => {
    if (user !== "") {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, [user]); // Use useEffect to update the access state whenever the user changes

  return access ? <>{children}</> : <p>Access Denied</p>;
};


export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string;
  status: boolean;
  roles: string[];
};