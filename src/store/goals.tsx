import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoalModel } from "../models/GoalModel.interface";
import { triggerToast } from "./toasts";
import axios from "axios";

export type GoalsStateModel = {
  goals: GoalModel[];
  goalsStatus: "PENDING" | "ERROR" | "IDLE";
  updateGoalStatus: "PENDING" | "ERROR" | "IDLE";
  createGoalStatus: "PENDING" | "ERROR" | "IDLE";
  deleteGoalStatus: "PENDING" | "ERROR" | "IDLE";
  addImageDataStatus: "PENDING" | "ERROR" | "IDLE";
  deleteImageStatus: "PENDING" | "ERROR" | "IDLE";
};

type GoalsReducersModel = {};

// http://localhost:3000/
// https://powerful-temple-30770.herokuapp.com
const domain = process.env.REACT_APP_GOALS_DOMAIN;

const goalsSlice = createSlice<GoalsStateModel, GoalsReducersModel>({
  name: "goals",
  initialState: {
    goals: [],
    goalsStatus: "IDLE",
    updateGoalStatus: "IDLE",
    createGoalStatus: "IDLE",
    deleteGoalStatus: "IDLE",
    addImageDataStatus: "IDLE",
    deleteImageStatus: "IDLE",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGoals.pending, (state, action) => {
        state.goalsStatus = "PENDING";
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goalsStatus = "IDLE";
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.goalsStatus = "ERROR";
      })
      .addCase(updateGoal.pending, (state, action) => {
        state.updateGoalStatus = "PENDING";
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.updateGoalStatus = "IDLE";
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.updateGoalStatus = "ERROR";
      })
      .addCase(createGoal.pending, (state, action) => {
        state.createGoalStatus = "PENDING";
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.createGoalStatus = "IDLE";
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.createGoalStatus = "ERROR";
      })
      .addCase(deleteGoal.pending, (state, action) => {
        state.deleteGoalStatus = "PENDING";
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.deleteGoalStatus = "IDLE";
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.deleteGoalStatus = "ERROR";
      })
      .addCase(addImageData.pending, (state, action) => {
        state.addImageDataStatus = "PENDING";
      })
      .addCase(addImageData.fulfilled, (state, action) => {
        state.addImageDataStatus = "IDLE";
      })
      .addCase(addImageData.rejected, (state, action) => {
        state.addImageDataStatus = "ERROR";
      })
      .addCase(deleteImage.pending, (state, action) => {
        state.deleteImageStatus = "PENDING";
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleteImageStatus = "IDLE";
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleteImageStatus = "ERROR";
      });
  },
});

const getGoals = createAsyncThunk(
  "goals/getGoals",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(domain + "/goals-manager/goals");
      return response.data;
    } catch (error: any) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error retrieving goals.",
          backgroundColor: "danger",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (
    goal: {
      data: GoalModel | undefined;
      successCallback?: (data?: any) => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.put(
        `${domain}/goals-manager/goals/${goal.data?.id}`,
        { ...goal.data }
      );

      dispatch(goalsActions.getGoals());
      goal.successCallback && goal.successCallback();
      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Updated successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error updating the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (
    goal: {
      data: GoalModel | undefined;
      successCallback?: (data?: any) => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(`${domain}/goals-manager/goals/`, {
        ...goal.data,
      });

      dispatch(goalsActions.getGoals());
      goal.successCallback && goal.successCallback();
      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Added successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error creating the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (
    goal: {
      id: string | undefined;
      successCallback?: (data?: any) => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.delete(
        `${domain}/goals-manager/goals/${goal.id}`
      );

      dispatch(goalsActions.getGoals());
      goal.successCallback && goal.successCallback();
      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Goal Deleted successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error Deleting the goal. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const addImageData = createAsyncThunk(
  "goals/addImageData",
  async (
    goal: {
      id: string | undefined;
      imageData: any;
      successCallback?: (data?: any) => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        `${domain}/goals-manager/goals/images/${goal.id}`,
        { ...goal.imageData }
      );

      dispatch(goalsActions.getGoals());
      goal.successCallback && goal.successCallback();
      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Image added successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error saving image info. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const deleteImage = createAsyncThunk(
  "goals/deleteImage",
  async (
    goal: {
      id: string | undefined;
      publicId: string | undefined;
      successCallback?: (data?: any) => void;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.delete(
        `${domain}/goals-manager/goals/images/${goal.id}?publicId=${goal.publicId}`
      );

      goal.successCallback && goal.successCallback();
      dispatch(
        triggerToast({
          header: "Success",
          bodyText: "Image deleted successfully.",
          backgroundColor: "success",
          delay: 3000,
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error deleting image. Please try again.",
          backgroundColor: "danger",
          delay: 3000,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const goalsActions = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
  addImageData,
  deleteImage,
};

export { goalsSlice, goalsActions };
