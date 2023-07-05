import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getServices = createAsyncThunk(
    "service/getServices",
    async (id) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8181/services/${id}`);
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
)