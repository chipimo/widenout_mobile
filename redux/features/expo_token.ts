import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
}

const initialState: UserState = {
  token: null,
};

export const expo_tokenSlice = createSlice({
  name: "expo_token",
  initialState,
  reducers: {
    set_expo_token: (
      state: {
        token: null;
      },
      action: PayloadAction<any>
    ) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set_expo_token } = expo_tokenSlice.actions;

export default expo_tokenSlice.reducer;
