import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from './store/store';
import AppRouter from './router';
import { createRoot } from "react-dom/client";


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
} else {
  console.error("Element with id 'root' not found in the DOM.");
}