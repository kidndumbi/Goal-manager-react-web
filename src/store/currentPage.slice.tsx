import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: { currentPage: "MainPage" },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

const currentPageActions = currentPageSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.currentPage.currentPage;
export { currentPageSlice, currentPageActions };
