// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  // Retrieve data from local storage
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("image");

  // Check if user is authenticated based on stored data
  if (authToken && username) {
    return {
      user: {
        username,
        image,
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    };
  }

  // Default state when no data in local storage
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
      // Clear state and local storage on logout
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("image");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
