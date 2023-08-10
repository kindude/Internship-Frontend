import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../types/UserResponse";

export interface UserState {
  user: User | undefined; 
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) =>{
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined; // Reset user to undefined
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions; 
export default userSlice.reducer; 
