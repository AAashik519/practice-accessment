import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      const { email, password, name, phone } = action.payload;
      state.user = { email, phone, name, password };
      state.isAuthenticated = true;
      state.error = null;
    },
    loginUser(state, action) {
      const { email, password } = action.payload;

      if (state.user && state.user.email === email && state.user.password === password) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = "Invalid email or password.";
      }
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
