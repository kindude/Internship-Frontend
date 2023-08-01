
import { StringState } from "../reducers/slice"; // Assuming you have exported StringState from stringSlice
import React, { ReactNode } from "react";
import { RouteProps } from "react-router-dom";
import { decodeAndVerifyToken } from "../tokens/tokenVerification";


export interface RootState {
  user: StringState; 

}


type PrivateRouteProps = RouteProps & {
  children: ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const token = localStorage.getItem("token") ?? "";
//   const isTokenValid = decodeAndVerifyToken(token);
const isTokenValid =false;
  return isTokenValid ? <>{children}</> : <p>Access Denied</p>;
};
