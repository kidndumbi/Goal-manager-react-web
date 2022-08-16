import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const massUpdateSlice = createSlice({
  name: "massUpdateIds",
  initialState: [],
  reducers: {
    setMassUpdateIds: (
      state: string[],
      action: PayloadAction<{ id: string | undefined; checked: boolean }>
    ) => {
      const { id, checked } = action.payload;

      if (checked && id && !state.includes(id)) {
        state.push(id);
      } else {
        if (id) {
          const index = state.indexOf(id);
          if (index > -1) {
            state.splice(index, 1);
          }
        }
      }
    },
    clearMassUpdateIds: (state: string[]) => {
      state.splice(0, state.length);
    },
  },
});

const massUpdateActions = massUpdateSlice.actions;

export const selectMassUpdateIds = (state: RootState) => state.massUpdateIds;
export { massUpdateSlice, massUpdateActions };
