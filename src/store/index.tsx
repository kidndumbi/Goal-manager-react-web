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

const storeReducer = (
  state: StoreStateModel = { goals: [], currentPage: "MainPage", searchValue: '' },
  action: StoreActionModel
): StoreStateModel => {
  if (action.type === "GET_ALL_GOALS") {
    return {
      ...state,
      goals: action.payload.goals,
    };
  }

  if (action.type === "SET_CURRENT_PAGE") {
    return {
      ...state,
      currentPage: action.payload.currentPage,
    };
  }

  if (action.type === "SET_SEARCH_VALUE") {
    return {
      ...state,
      searchValue: action.payload.searchValue,
    };
  }

  return state;
};

const store = createStore(storeReducer);

export { store };
