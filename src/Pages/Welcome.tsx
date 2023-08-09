import React from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../types/types";
import store from '../store/store';

const WelcomePage: React.FC = () => {
  
  return (
  
    <div>
      <h1>Hello </h1>
      <p>React app</p>
      <div>
        Welcome to my REACT/FASTAPI APP
      </div>
    </div>

  );
};

export default WelcomePage;

