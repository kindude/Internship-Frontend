import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from './store';
import AppRouter from './router';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);