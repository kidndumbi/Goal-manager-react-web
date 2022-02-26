import { createSlice } from "@reduxjs/toolkit";
import { ToastModel } from "../models/ToastModel.interface";

type ToastStateModel = {
  toasts: ToastModel[];
};

type ToastReducerModel = {
  addToast: (state: ToastStateModel, action: any) => void;
  updateToast: (state: ToastStateModel, action: any) => void;
};

const toastsSlice = createSlice<ToastStateModel, ToastReducerModel>({
  name: "toasts",
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state: ToastStateModel, action) {
      state.toasts.push({
        ...action.payload.toast,
      });
    },
    updateToast(state: ToastStateModel, action) {},
  },
});

const toastActions = {
  ...toastsSlice.actions,
};

export { toastsSlice, toastActions };
