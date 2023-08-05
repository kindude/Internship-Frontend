import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer"; 
import usersReducer from "../reducers/userReducer"; 
import { RootState } from "../types/types";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,

  },
});

export default store;