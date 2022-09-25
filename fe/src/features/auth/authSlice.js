import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  token: "",
  name: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, email, token } = action.payload;
      state.isSignedIn = true;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    logout: (state) => {
      state.isSignedIn = false;
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authState = (state) => state[authSlice.name];
