import React from 'react';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../types/types";
import { updateString } from '../actions/stringAction';
import store from '../store/store';

const WelcomePage: React.FC = () => {
  const testString = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const changeString = () => {
    const newString = 'Updated String';
    dispatch(updateString(newString));
  }

  return (
  
    <div>
      <h1>Hello </h1>
      <p>React app</p>
      <div>
      {/* <p>Test String: {testString}</p> */}
      <button onClick={changeString}>Update Value</button>
      </div>
    </div>

  );
};

export default WelcomePage;

