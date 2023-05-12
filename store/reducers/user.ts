import { createSlice } from "@reduxjs/toolkit";

const initialState = { userPayload: {isLoggedIn: false , token:""} };
export const userSlice = createSlice({
  name: "userPayload",
  initialState,
  reducers: {
    saveUser: (state , action) => {
      state.userPayload = { isLoggedIn: true , ...action.payload} ;
    },
    logoutUser: (state) => {
      state.userPayload = {isLoggedIn: false , token: ""}
    }
  },
});

export const { saveUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
