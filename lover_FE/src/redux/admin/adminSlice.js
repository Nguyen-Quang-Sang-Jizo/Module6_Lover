import { createSlice } from "@reduxjs/toolkit";
import { changeRole, findAllUser, lockAccount, openAccount} from "../../services/adminService.js";

const initialState = {
    listUser: [],

};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(findAllUser.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });


        builder.addCase(lockAccount.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });
        
        builder.addCase(openAccount.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });

        builder.addCase(changeRole.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });
    },
});

export default adminSlice.reducer;
