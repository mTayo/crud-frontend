import { configureStore } from "@reduxjs/toolkit";
import { globalReducer } from "./slices";

export const store = configureStore({
  reducer: {
    global: globalReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;