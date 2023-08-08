import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../types/UserResponse";

export interface UserState {
  users: User[]; // Change null to undefined or User
}

const initialState: UserState = {
  users: [], // Change null to undefined or remove this line if you want to initialize with an empty object
};

const usersSlice = createSlice({
  name: 'users', // Change 'string' to 'user'
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { updateUsers, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
