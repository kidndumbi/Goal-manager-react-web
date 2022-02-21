import { createSlice } from "@reduxjs/toolkit";


const currentPageSlice = createSlice({
    name: "currentPage",
    initialState: {currentPage: 'MainPage'},
    reducers: {
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload.currentPage;
      },
    },
  });

  const currentPageActions = currentPageSlice.actions;

  export {  currentPageSlice, currentPageActions }