import { createSlice } from "@reduxjs/toolkit";
import {getTypes} from "../../services/typeService.js";

const initialState = {
    type: [],
};

const typeSlice = createSlice({
    name: "type",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTypes.fulfilled, (state, action) => {
            state.type = action.payload;
        });
    }
});

export default typeSlice.reducer;