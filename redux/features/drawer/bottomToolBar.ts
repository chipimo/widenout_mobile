import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BottomBarState {
  showBottomBar: boolean;
}

const initialState: BottomBarState = {
    showBottomBar: true,
};

export const BottomBarSlice = createSlice({
  name: "bottomTab",
  initialState,
  reducers: {
    ShowBottomBar: (
      state: {
        showBottomBar: true,
      },
      action: PayloadAction<any>
    ) => {
      state.showBottomBar = true;
    },
    HideBottomBar: (
      state: {
        showBottomBar: false,
      },
      action: PayloadAction<any>
    ) => {
      state.showBottomBar = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ShowBottomBar, HideBottomBar } = BottomBarSlice.actions;

export default BottomBarSlice.reducer;
