import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from './store/store';
import AppRouter from './router';
import { createRoot } from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';




const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(

    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN || ""}
      clientId={process.env.REACT_APP_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AP_DOMAIN,
      }}
    >
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Auth0Provider>
  );
} else {
  console.error("Element with id 'root' not found in the DOM.");
}