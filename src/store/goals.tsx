import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: { goals: [] },
  reducers: {
    setGoals: (state: any, action) => {
      state.goals = action.payload.goals;
    },
  },
});

const getGoalsThunk = () => {
  return (dispatch: any) => {
    fetch("https://whispering-headland-62985.herokuapp.com/goals-manager/goals")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(goalsActions.setGoals({ goals: data }));
      });
  };
};

const goalsActions = goalsSlice.actions;

export { goalsSlice, goalsActions, getGoalsThunk };
