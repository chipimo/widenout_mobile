import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
  open: boolean;
  close: boolean;
}

const initialState: DrawerState = {
    open: false,
    close: false
};

export const DrawerStateSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    OpenDrawer: (
      state: {
        open: true,
        close: false
      },
      action: PayloadAction<any>
    ) => {
      state.close = false;
      state.open = true;
    },
    CloseDrawer: (
      state: {
        open: false,
        close: true
      },
      action: PayloadAction<any>
    ) => {
      state.close = true;
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { OpenDrawer, CloseDrawer } = DrawerStateSlice.actions;

export default DrawerStateSlice.reducer;
