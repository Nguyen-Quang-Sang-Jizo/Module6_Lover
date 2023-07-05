import { createSlice } from "@reduxjs/toolkit";
import {
    acceptBooking,
    acceptListBooking, acceptListBookingProvider,
    addBooking,
    detailBooking, detailBookingProvider, doneBooking, doneListBooking,
    pendingListBookingProvider, rejectBooking, rejectListBookingProvider,
    rentalListBooking
} from "../../services/bookingService.js";
import {apiGetDistrict, apiGetProvinces} from "../../services/googleMapService.js";

const initialState = {
    booking: [],
    detail: {},
    apiG: {},
    apiGoogle:{},
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(apiGetProvinces.fulfilled, (state, action) => {
            state.apiG = action.payload;
        });

        builder.addCase(apiGetDistrict.fulfilled, (state, action) => {
            state.apiGoogle = action.payload;
        });

        builder.addCase(rentalListBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(doneListBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(detailBooking.fulfilled, (state, action) => {
            state.detail = action.payload;
        });

        builder.addCase(detailBookingProvider.fulfilled, (state, action) => {
            state.detail = action.payload;
        });

        builder.addCase(acceptListBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(pendingListBookingProvider.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(acceptListBookingProvider.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(rejectListBookingProvider.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(acceptBooking.fulfilled, (state, action) => {
            state.detail = action.payload;
        });

        builder.addCase(rejectBooking.fulfilled, (state, action) => {
            state.detail = action.payload;
        });

        builder.addCase(doneBooking.fulfilled, (state, action) => {
            state.detail = action.payload;
        });
    }
});

export default bookingSlice.reducer;