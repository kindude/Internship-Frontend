import React from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../types/types";
import store from '../store/store';
import "../styles/welcomePage.css";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-header">Hello</h1>
      <p className="welcome-text">React app</p>
      <div className="welcome-message">
        Welcome to my <span className="highlight">REACT/FASTAPI APP</span>
      </div>
    </div>
  );
};

export default WelcomePage;

