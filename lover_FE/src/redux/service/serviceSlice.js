import { createSlice } from "@reduxjs/toolkit";
import {getServices} from "../../services/serviceService.js";

const initialState = {
    service: [],
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.service = action.payload;
        });
    }
});

export default serviceSlice.reducer;