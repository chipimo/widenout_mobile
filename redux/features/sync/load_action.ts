import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  loading: boolean;
  payload: object;
}

const initialState: UserState = {
    loading: false,
    payload:{}
};

export const load_actionSlice = createSlice({
  name: "load_action",
  initialState,
  reducers: {
    start_load: (
      state: {
        loading: true;
        payload: {}
    },
    action: PayloadAction<any>
    ) => {
        state.loading = true;
    },
    end_load: (
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
export const { start_load, end_load } = load_actionSlice.actions;

export default load_actionSlice.reducer;
