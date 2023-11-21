// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default userSlice.reducer;
