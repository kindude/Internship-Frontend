import React, { ReactNode } from "react";
import { Auth0Provider as BaseAuth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";

interface Auth0ProviderProps extends Auth0ProviderOptions {
  children: ReactNode;
}

const Auth0Provider: React.FC<Auth0ProviderProps> = ({ children, ...props }) => {
  return (
    <BaseAuth0Provider
      {...props}
    >
      {children}
    </BaseAuth0Provider>
  );
};

export default Auth0Provider;
