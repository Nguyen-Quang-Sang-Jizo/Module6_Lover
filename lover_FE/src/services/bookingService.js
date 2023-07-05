import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";

export const addBooking = createAsyncThunk(
    "booking/addBooking",
    async ({ providerId, bookingData }) => {
        try {
            const res = await customAPI().post(`bookings/provider/${providerId}`, {
                address: bookingData.address,
                hour: bookingData.selectedOption,
            });
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const rentalListBooking = createAsyncThunk(
    "booking/rentalListBooking",
    async () => {
        try {
            const res = await customAPI().get(`bookings/pending` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);

export const doneListBooking = createAsyncThunk(
    "booking/doneListBooking",
    async () => {
        try {
            const res = await customAPI().get(`bookings/done` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const detailBooking = createAsyncThunk(
    "booking/detailBooking",
    async (id) => {
        try {
            const res = await customAPI().get(`bookings/detail/${id}` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);

export const acceptListBooking = createAsyncThunk(
    "booking/acceptListBooking",
    async () => {
        try {
            const res = await customAPI().get(`bookings/accept` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const detailBookingProvider = createAsyncThunk(
    "booking/detailBookingProvider",
    async (id) => {
        try {
            const res = await customAPI().get(`bookings/detailProvider/${id}` );
            return res.data.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const pendingListBookingProvider = createAsyncThunk(
    "booking/pendingListBookingProvider",
    async () => {
        try {
            const res = await customAPI().get(`bookings/provider/pending` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);

export const acceptListBookingProvider = createAsyncThunk(
    "booking/acceptListBookingProvider",
    async () => {
        try {
            const res = await customAPI().get(`bookings/provider/accept` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const rejectListBookingProvider = createAsyncThunk(
    "booking/rejectListBookingProvider",
    async () => {
        try {
            const res = await customAPI().get(`bookings/provider/reject` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const acceptBooking = createAsyncThunk(
    "booking/acceptBooking",
    async (id) => {
        try {
            const res = await customAPI().put(`bookings/accept/${id}` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);

export const rejectBooking = createAsyncThunk(
    "booking/rejectBooking",
    async (id) => {
        try {
            const res = await customAPI().put(`bookings/reject/${id}` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);

export const doneBooking = createAsyncThunk(
    "booking/doneBooking",
    async (id) => {
        try {
            const res = await customAPI().put(`bookings/done/${id}` );
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);











