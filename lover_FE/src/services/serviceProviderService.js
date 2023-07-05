import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getServiceProvider = createAsyncThunk(
    "service/getServiceProvider",
    async (id) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8181/service-provider/type/${id}`);
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
)