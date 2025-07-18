/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Define a type for the slice state
export interface GlobalStates {
  theme: 'light'| 'dark';
  user: any,
  isLoggedIn: boolean
  taskReport: {
    total: number;
    done: number;
    pending: number;
    inProgress: number;
  },
  appInitialized: boolean;
}

// Define the initial state using that type
const initialState: GlobalStates = {
  theme: 'light',
  user: {},
  appInitialized: false,
  taskReport: {
    total: 0,
    done: 0,
    pending: 0,
    inProgress: 0
  },
  isLoggedIn: false
};

export const globalStateSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      return state;
    },

    setAppInitialized: (state, action: PayloadAction<boolean>) => {
      state.appInitialized = action.payload;
      return state;
    },

    setTaskReport: (state, action: PayloadAction<any>) => {
      state.taskReport = action.payload;
      return state;
    },

    setTheme: (state, action: PayloadAction<'dark'| 'light'>) => {
      state.theme = action.payload;
      return state;
    },

    
  
  },
});

export const { setTheme, setActiveUser, setAppInitialized, setTaskReport } = globalStateSlice.actions;

export default globalStateSlice.reducer;