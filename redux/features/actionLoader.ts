import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false,
};

export const actionLoaderSlice = createSlice({
  name: "action_loader",
  initialState,
  reducers: {
    setLoader: (
      state: {
        isLoading: true;
      },
      action: PayloadAction<any>
    ) => {
      state.isLoading = true;
    },
    unSetLoader: (
      state: {
        isLoading: false;
      },
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { unSetLoader, setLoader } = actionLoaderSlice.actions;

export default actionLoaderSlice.reducer;
