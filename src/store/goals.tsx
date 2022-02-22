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

const getGoals = () => {
  return async (dispatch: any) => {
    try {
      const goals = await fetch(
        "https://whispering-headland-62985.herokuapp.com/goals-manager/goals"
      ).then((response) => response.json());

      dispatch(goalsActions.setGoals({ goals }));
    } catch (error) {}
  };
};

const goalsActions = {
  ...goalsSlice.actions,
  getGoals,
};

export { goalsSlice, goalsActions };
