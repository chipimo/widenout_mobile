import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  theme: string;
}

const initialState: UserState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    appTheme: (
      state: {
        theme: string;
      },
      action: PayloadAction<any>
    ) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appTheme } = themeSlice.actions;

export default themeSlice.reducer;
