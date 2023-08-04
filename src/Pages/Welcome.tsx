import React from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../types/types";
import store from '../store/store';

const WelcomePage: React.FC = () => {
  const testString = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  return (
  
    <div>
      <h1>Hello </h1>
      <p>React app</p>
      <div>
      {/* <p>Test String: {testString}</p> */}
      <button>Update Value</button>
      </div>
    </div>

  );
};

export default WelcomePage;

