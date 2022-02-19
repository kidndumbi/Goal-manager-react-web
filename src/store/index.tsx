import { createStore } from "redux";
import { GoalModel } from "../models/GoalModel.interface";

export interface StoreStateModel {
    goals?: GoalModel[],
    currentPage?: string
}

export interface StoreActionModel {
    type?: string,
    payload?: any
}


const storeReducer = (state: StoreStateModel = {goals: [], currentPage: 'MainPage'}, action: StoreActionModel): StoreStateModel => {

    if(action.type === 'GET_ALL_GOALS'){
       return {
           ...state,
           goals: action.payload.goals
       }
    } 

    if(action.type === 'SET_CURRENT_PAGE'){
        console.log('in set current page', action.payload)
       return {
           ...state,
           currentPage: action.payload.currentPage
       }
    }

    return state;

}

const store = createStore(storeReducer);

export { store };