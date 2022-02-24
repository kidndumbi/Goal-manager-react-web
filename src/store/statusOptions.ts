import { createSlice } from "@reduxjs/toolkit";

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

export { statusOptionsSlice };
