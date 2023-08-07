
import { UserState } from "../reducers/userReducer"; 
import { RouteProps } from "react-router-dom";
import React, { useState, useEffect,ReactNode } from 'react';
import { useSelector } from "react-redux";


export interface RootState {
  user: UserState; 
}


type PrivateRouteProps = RouteProps & {
  children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user); 
  const [access, setAccess] = useState(false); // Initialize access state as false

  useEffect(() => {
    if (user !== undefined) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, [user]); 

  return access ? <>{children}</> : <p>Access Denied</p>;
};


