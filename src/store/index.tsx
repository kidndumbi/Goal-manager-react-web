import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { GoalModel } from "../models/GoalModel.interface";
import { currentPageSlice } from "./currentPage.slice";
import { goalsSlice } from "./goals.slice";
import { searchValueSlice } from "./search.slice";
import { statusOptionsSlice } from "./statusOptions.slice";
import { toastsSlice } from "./toasts.slice";

export interface StoreStateModel {
  goals?: GoalModel[];
  currentPage?: string;
  searchValue?: string;
  statusOptions?: any[];
}

export interface StoreActionModel {
  type?: string;
  payload?: any;
}

const searchValueActions = searchValueSlice.actions;

const store = configureStore({
  reducer: {
    goals: goalsSlice.reducer,
    currentPage: currentPageSlice.reducer,
    searchValue: searchValueSlice.reducer,
    statusOptions: statusOptionsSlice.reducer,
    toasts: toastsSlice.reducer,
  },
});

export { store, searchValueActions };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
