import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    addToast(
      state: ToastStateModel,
      action: PayloadAction<{ toast: ToastModel }>
    ) {
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

export { toastsSlice, toastActions, triggerToast };
