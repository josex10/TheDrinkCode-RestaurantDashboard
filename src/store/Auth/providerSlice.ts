import { createSlice } from "@reduxjs/toolkit";
import { CProviderInitialState } from "../../commons/constants";

export const providerSlice = createSlice({
  name: "provider",
  initialState: CProviderInitialState,
  reducers: {
    onSetLoading: (state, { payload }) => {
      state.loading = payload;
    },
    onSetErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
      state.successMessage = null;
    },
    onSetSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
      state.errorMessage = null;
    },
    onSetProvider: (state, { payload }) => {
      const listOfProviders = state.providers;
      listOfProviders.push(payload);
      state.providers = listOfProviders;
      state.errorMessage = null;
      state.successMessage = null;
    },
    onSetList: (state, { payload }) => {
      state.providers = payload;
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetLoading,
  onSetErrorMessage,
  onSetProvider,
  onSetList,
  onSetSuccessMessage,
} = providerSlice.actions;
