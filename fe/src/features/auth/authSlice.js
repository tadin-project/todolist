import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  token: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user } = action.payload;
      state.isSignedIn = true;
      state.username = user.username;
      state.token = user.token;
    },
    logout: (state) => {
      state.isSignedIn = false;
      state.username = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authState = (state) => state[authSlice.name];
