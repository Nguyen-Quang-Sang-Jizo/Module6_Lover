import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const apiGetProvinces = createAsyncThunk(
    "api/apiGetProvinces",
    async () => {
        try {
            const res = await axios.get("https://vapi.vnappmob.com/api/province");
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
)

export const apiGetDistrict = createAsyncThunk(
    "api/apiGetDistrict",
    async (provinceId) => {
        try {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
)