import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TopBarState {
  showTopBar: boolean;
}

const initialState: TopBarState = {
    showTopBar: true,
};

export const TopBarSlice = createSlice({
  name: "topbar",
  initialState,
  reducers: {
    ShowTopBar: (
      state: {
        showTopBar: true,
      },
      action: PayloadAction<any>
    ) => {
      state.showTopBar = true;
    },
    HideTopBar: (
      state: {
        showTopBar: false,
      },
      action: PayloadAction<any>
    ) => {
      state.showTopBar = false;
      // console.log('hey')
    },
  },
});

// Action creators are generated for each case reducer function
export const { ShowTopBar, HideTopBar } = TopBarSlice.actions;

export default TopBarSlice.reducer;
