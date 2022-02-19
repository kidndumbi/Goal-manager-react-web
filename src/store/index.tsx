import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { GoalModel } from "../models/GoalModel.interface";

export interface StoreStateModel {
  goals?: GoalModel[];
  currentPage?: string;
  searchValue?: string;
}

export interface StoreActionModel {
  type?: string;
  payload?: any;
}

const goalsSlice = createSlice({
  name: "goals",
  initialState: { goals: [] },
  reducers: {
    setGoals: (state: any, action) => {
      state.goals = action.payload.goals;
    },
  },
});

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: {currentPage: 'MainPage'},
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

const serachValueSlice = createSlice({
  name: "searchValue",
  initialState: {searchValue: ''},
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
  },
});

const goalsActions = goalsSlice.actions;
const currentPageActions = currentPageSlice.actions;
const searchValueActions = serachValueSlice.actions;

const store = configureStore({
  reducer: {
    goals: goalsSlice.reducer,
    currentPage: currentPageSlice.reducer,
    searchValue: serachValueSlice.reducer,
  },
});

export { store, goalsActions, currentPageActions, searchValueActions };
