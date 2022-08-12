import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const searchValueSlice = createSlice({
  name: "searchValue",
  initialState: { searchValue: "" },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const selectSearchValue = (state: RootState) =>
  state.searchValue.searchValue;
export { searchValueSlice };
