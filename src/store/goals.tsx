import { createSlice } from "@reduxjs/toolkit";
import { GoalModel } from "../models/GoalModel.interface";
import { toastActions } from "./toasts";

export type GoalsStateModel = {
  goals: GoalModel[];
  loading: boolean;
  error: any;
  goalUpdateError: any;
};

type GoalsReducersModel = {
  setGoals: (state: GoalsStateModel, action: any) => void;
  setLoading: (state: GoalsStateModel, action: any) => void;
  setError: (state: GoalsStateModel, action: any) => void;
  setGoalUpdateError: (state: GoalsStateModel, action: any) => void;
};

const goalsSlice = createSlice<GoalsStateModel, GoalsReducersModel>({
  name: "goals",
  initialState: {
    goals: [],
    loading: false,
    error: null,
    goalUpdateError: null,
  },
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
    setGoalUpdateError: (state: GoalsStateModel, action) => {
      state.goalUpdateError = action.payload.error;
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
      dispatch(
        toastActions.addToast({
          toast: {
            header: "Error",
            bodyText: "There was an error retrieving goals.",
            backgroundColor: "danger",
          },
        })
      );
    }
  };
};

const updateGoal = (goal: GoalModel | undefined) => {
  return async (dispatch: any) => {
    try {
      dispatch(goalsActions.setGoalUpdateError({ error: null }));
      const goalSaved = await fetch(
        `https://whispering-headland-62985.herokuapp.com/goals-manager/goals/${goal?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goal),
        }
      ).then((response) => response.json());

      dispatch(
        toastActions.addToast({
          toast: {
            header: "Success",
            bodyText: "Goal Updated successfully.",
            backgroundColor: "success",
          },
        })
      );
      dispatch(goalsActions.getGoals());
    } catch (error) {
      dispatch(goalsActions.setGoalUpdateError({ error }));
      dispatch(
        toastActions.addToast({
          toast: {
            header: "Error",
            bodyText: "There was an error updating the goal. Please try again.",
            backgroundColor: "danger",
          },
        })
      );
    }
  };
};

const goalsActions = {
  ...goalsSlice.actions,
  getGoals,
  updateGoal,
};

export { goalsSlice, goalsActions };
