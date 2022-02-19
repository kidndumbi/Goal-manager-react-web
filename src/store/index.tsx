import { createStore } from "redux";


const storeReducer = (state: any = {goals: []}, action: any) => {

    if(action.type === 'GET_ALL_GOALS'){
       return {
           ...state,
           goals: action.goals
       }
    } 

    return state;

}

const store = createStore(storeReducer);

export { store };