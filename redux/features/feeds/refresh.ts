import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  refresh: boolean;
}

const initialState: UserState = {
  refresh: false,
};

export const refreshFeedsSlice = createSlice({
  name: "feed_refresh",
  initialState,
  reducers: {
    refreshFeeds: (
      state: {
        refresh: true;
      },
      action: PayloadAction<any>
    ) => {
      state.refresh = true;
    },
    refreshDone: (
      state: {
        refresh: false;
      },
      action: PayloadAction<any>
    ) => {
      state.refresh = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { refreshDone, refreshFeeds } = refreshFeedsSlice.actions;

export default refreshFeedsSlice.reducer;
