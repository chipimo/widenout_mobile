import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  search_list: any;
}

const initialState: UserState = {
  search_list: [],
};

export const search_data = createSlice({
  name: "search_data",
  initialState,
  reducers: {
    search_: (
      state: {
        search_list: [];
      },
      action: PayloadAction<any>
    ) => {
      state.search_list = action.payload.list;
    },
  },
});

// Action creators are generated for each case reducer function
export const { search_ } = search_data.actions;

export default search_data.reducer;
