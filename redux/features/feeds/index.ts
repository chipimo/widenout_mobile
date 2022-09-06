import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  list: [];
}

const initialState: UserState = {
  list: [],
};

export const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    feeds: (
      state: {
        list: [];
      },
      action: PayloadAction<any>
    ) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { feeds } = feedsSlice.actions;

export default feedsSlice.reducer;
