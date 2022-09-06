import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: [];
  isLoggedIn: boolean;
  accessToken: string;
}

const initialState: UserState = {
  user: [],
  isLoggedIn: false,
  accessToken: "",
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (
      state: {
        user: [];
        isLoggedIn: boolean;
        accessToken: string;
      },
      action: PayloadAction<any>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.accessToken = action.payload.access_token;
    },
    userLoggedOut: (
      state: {
        user: [];
        isLoggedIn: boolean;
        accessToken: string;
      },
      action: PayloadAction<any>
    ) => {
      state.user = [];
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = userAuthSlice.actions;

export default userAuthSlice.reducer;
