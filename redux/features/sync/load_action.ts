import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  loading: boolean;
  payload: object;
}

const initialState: UserState = {
    loading: false,
    payload:{}
};

export const refreshFeedsSlice = createSlice({
  name: "load_action",
  initialState,
  reducers: {
    refreshFeeds: (
      state: {
        loading: true;
        payload: {}
    },
    action: PayloadAction<any>
    ) => {
        state.loading = true;
    },
    refreshDone: (
        state: {
            loading: false;
            payload: {}
      },
      action: PayloadAction<any>
    ) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { refreshDone, refreshFeeds } = refreshFeedsSlice.actions;

export default refreshFeedsSlice.reducer;
