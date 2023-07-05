import { createSlice } from "@reduxjs/toolkit";
import { editUser, login, logout, showUser } from "../../services/useService";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("token")),
  profile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.data && action.payload.data.length > 30) {
        state.currentUser = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload.data));
      } else {
        state.currentUser = undefined;
        localStorage.removeItem("token");
      }
    });


    builder.addCase(showUser.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    // builder.addCase(editUser.fulfilled, (state, action) => {
    //   state.profile = action.payload;
    // });
  },
});
export default userSlice.reducer;
