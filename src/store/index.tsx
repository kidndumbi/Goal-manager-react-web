import { configureStore, createSlice } from "@reduxjs/toolkit";
import { GoalModel } from "../models/GoalModel.interface";
import { currentPageSlice } from "./currentPage";
import { goalsSlice } from "./goals";
import { searchValueSlice } from "./search";

export interface StoreStateModel {
  goals?: GoalModel[];
  currentPage?: string;
  searchValue?: string;
}

export interface StoreActionModel {
  type?: string;
  payload?: any;
}

// const goalsActions = goalsSlice.actions;
// const currentPageActions = currentPageSlice.actions;
const searchValueActions = searchValueSlice.actions;

const store = configureStore({
  reducer: {
    goals: goalsSlice.reducer,
    currentPage: currentPageSlice.reducer,
    searchValue: searchValueSlice.reducer,
  },
});

export { store, searchValueActions };
