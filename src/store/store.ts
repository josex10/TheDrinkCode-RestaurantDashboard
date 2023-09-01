import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth/authSlice";
import { providerSlice } from "./Auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    provider: providerSlice.reducer,
  },
});
