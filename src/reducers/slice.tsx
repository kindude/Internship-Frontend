import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StringState {
  value: string;
}

const initialState: StringState = {
  value: 'Initial String',
};

const stringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    updateString: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateString } = stringSlice.actions;
export default stringSlice.reducer;