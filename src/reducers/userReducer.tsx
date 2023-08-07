import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../types/UserResponse";

export interface UserState {
  user: User | undefined; // Change null to undefined or User
}

const initialState: UserState = {
  user: undefined, // Change null to undefined or remove this line if you want to initialize with an empty object
};

const userSlice = createSlice({
  name: 'user', // Change 'string' to 'user'
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) =>{
      state.user = action.payload;
    }
  },
});

export const { updateUser } = userSlice.actions; // Change from stringSlice to userSlice
export default userSlice.reducer; // Change from stringSlice to userSlice
