import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  list: [];
}

const initialState: UserState = {
  list: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    PostComments: (
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
export const { PostComments } = commentsSlice.actions;

export default commentsSlice.reducer;
