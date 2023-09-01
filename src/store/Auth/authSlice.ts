import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'authenticated','not-authenticated',
    auth: {},
    errorMessage: null,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.auth = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.auth = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.auth = {};
      state.errorMessage = payload;
    },
    onChangeAuth: (state, { payload }) => {
      state.auth = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  onChangeAuth,
  clearErrorMessage,
} = authSlice.actions;
