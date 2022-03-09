import { createSlice } from "@reduxjs/toolkit";
import { GoalModel } from "../models/GoalModel.interface";
import { ToastModel } from "../models/ToastModel.interface";
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

// http://localhost:3001/
// https://whispering-headland-62985.herokuapp.com
const domain = 'https://whispering-headland-62985.herokuapp.com';

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

const triggerToast = ({
  header,
  bodyText,
  backgroundColor,
  delay,
}: ToastModel) => {
  return toastActions.addToast<{ toast: ToastModel }>({
    toast: {
      header: header || "Success",
      bodyText: bodyText || "Success",
      backgroundColor: backgroundColor || "success",
      delay,
    },
  });
};

const getGoals = () => {
  return async (dispatch: any) => {
    try {
      dispatch(goalsActions.setLoading({ loading: true }));

      dispatch(goalsActions.setError({ error: null }));
      const goals = await fetch(
        domain + "/goals-manager/goals"
      ).then((response) => response.json());

      dispatch(goalsActions.setGoals({ goals }));
      dispatch(goalsActions.setLoading({ loading: false }));
    } catch (error) {
      dispatch(goalsActions.setLoading({ loading: false }));
      dispatch(goalsActions.setError({ error }));
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error retrieving goals.",
          backgroundColor: "danger",
        })
      );
    }
  };
};



const updateGoal = (goal: GoalModel | undefined, callBackFn?: () => void) => {
  return async (dispatch: any) => {
    try {
      dispatch(goalsActions.setGoalUpdateError({ error: null }));
      await fetch(
        `${domain}/goals-manager/goals/${goal?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goal),
        }
      ).then((response) => response.json());

      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Updated successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      dispatch(goalsActions.getGoals());
    } catch (error) {
      dispatch(goalsActions.setGoalUpdateError({ error }));
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error updating the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
    }
  };
};

const createGoal = (goal: GoalModel | undefined, callBackFn?: () => void) => {
  return async (dispatch: any) => {
    try {
      await fetch(
        `${domain}/goals-manager/goals/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goal),
        }
      ).then((response) => response.json());

      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Added successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      dispatch(goalsActions.getGoals());

      callBackFn && callBackFn();
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error creating the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
    }
  };
};

const deleteGoal = (id: string | undefined, callBackFn?: () => void) => {
  return async (dispatch: any) => {
    try {
      const data = await fetch(
        `${domain}/goals-manager/goals/${id}`,
        {
          method: "DELETE",
        }
      ).then((response) => response.text());

      console.log("data received:::", data);

      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Deleted successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      dispatch(goalsActions.getGoals());

      callBackFn && callBackFn();
    } catch (error) {
      console.log("Error received:::", error);

      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error Deleting the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
    }
  };
};

const goalsActions = {
  ...goalsSlice.actions,
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};

export { goalsSlice, goalsActions };
