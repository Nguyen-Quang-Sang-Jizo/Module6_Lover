import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTypes = createAsyncThunk(
    "type/getTypes",
    async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8181/type");
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
)