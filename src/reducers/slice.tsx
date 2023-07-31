import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StringState {
  value: string;
  email: string;
  username: string;
}

const initialState: StringState = {
  value: 'Initial String',
  email: '',
  username: '',
};

const stringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    updateString: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { updateString, updateEmail, updateUsername } = stringSlice.actions;
export default stringSlice.reducer;