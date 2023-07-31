// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "../reducers/slice"
import { RootState } from "../types/types";


const store = configureStore({
  reducer: {
    user: stringReducer, // Update this with the correct reducer name
    // Add other reducers as needed
  },
});

export default store;