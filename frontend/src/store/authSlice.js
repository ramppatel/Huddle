import { createSlice } from "@reduxjs/toolkit";

const AUTH_STORAGE_KEY = "auth";

const storage = {
  get: () => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  set: (data) => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  lastLogin: null,
};

const getInitialState = () => {
  const authData = storage.get();

  if (authData?.user) {
    return {
      ...initialState,
      user: authData.user,
      isAuthenticated: true,
      lastLogin: authData.lastLogin,
    };
  }

  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.lastLogin = new Date().toISOString();

      storage.set({
        user,
        lastLogin: state.lastLogin,
      });
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
    },
    logout: (state) => {
      Object.assign(state, initialState);
      storage.clear();
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      storage.set({
        user: state.user,
        lastLogin: state.lastLogin,
      });
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Actions
export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
