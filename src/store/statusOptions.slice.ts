import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const statusOptionsSlice = createSlice({
  name: "statusOptions",
  initialState: {
    options: [
      { name: "Complete", value: "COMPLETE" },
      { name: "In Progress", value: "IN_PROGRESS" },
      { name: "Failed", value: "FAILED" },
    ],
  },
  reducers: {},
});

export const selectStatusOptions = (state: RootState) =>
  state.statusOptions.options;
export { statusOptionsSlice };
