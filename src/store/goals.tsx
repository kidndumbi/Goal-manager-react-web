import { createSlice } from "@reduxjs/toolkit";
import { GoalModel } from "../models/GoalModel.interface";

export type GoalsStateModel = {
  goals: GoalModel[];
  loading: boolean;
  error: any;
};

type GoalsReducersModel = {
  setGoals: (state: GoalsStateModel, action: any) => void;
  setLoading: (state: GoalsStateModel, action: any) => void;
  setError: (state: GoalsStateModel, action: any) => void;
};

const goalsSlice = createSlice<GoalsStateModel, GoalsReducersModel>({
  name: "goals",
  initialState: { goals: [], loading: false, error: null },
  reducers: {
    setGoals: (state: GoalsStateModel, action) => {
      state.goals = action.payload.goals;
    },
    setLoading: (state: GoalsStateModel, action) => {
      state.loading = action.payload.loading;
    },
    setError: (state: GoalsStateModel, action) => {
      state.error = action.payload.error;
    },
  },
});

const getGoals = () => {
  return async (dispatch: any) => {
    try {
      dispatch(goalsActions.setLoading({ loading: true }));

      dispatch(goalsActions.setError({ error: null }));
      const goals = await fetch(
        "https://whispering-headland-62985.herokuapp.com/goals-manager/goals"
      ).then((response) => response.json());

      dispatch(goalsActions.setGoals({ goals }));
      dispatch(goalsActions.setLoading({ loading: false }));
    } catch (error) {
      dispatch(goalsActions.setLoading({ loading: false }));
      dispatch(goalsActions.setError({ error }));
    }
  };
};

const goalsActions = {
  ...goalsSlice.actions,
  getGoals,
};

export { goalsSlice, goalsActions };
