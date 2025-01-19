import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, getDataFromLocalStorage } from "../utils/auth";

const getInitialState = () => {
  const { authToken, username } = getDataFromLocalStorage();

  if (authToken && username) {
    return {
      user: {
        username,
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    };
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      clearLocalStorage();
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
