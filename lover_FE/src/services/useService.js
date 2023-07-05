import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customAPI.js";

export const login = createAsyncThunk("users/login", async (user) => {
  try {
    let data = "";
    const res = await axios
      .post("http://127.0.0.1:8181/users/login", user)
      .then((res) => {
        data = res.data.data;
      })
      .catch((err) => {
        data = err.response.data.data;
        return err.response.data.data;
      });
    if (data.length > 30) {
      return { data };
    } else {
      return { err: data };
    }
  } catch (err) {
    return err.response.data.payload;
  }
});

export const otp = createAsyncThunk("otp", async (otp) => {
  return axios
    .post("http://127.0.0.1:8181/otp", { owner: otp })
    .then((data) => {
      return data.data.message;
    })
    .catch((err) => {
      return err.response.data.message;
    });
});

export const register = createAsyncThunk("users/register", async (user) => {
  return axios
    .post("http://127.0.0.1:8181/users/register", user)
    .then((data) => {
      return data.data.message;
    })
    .catch((err) => {
      return err.response.data.message;
    });
});

export const showUser = createAsyncThunk("users/showUser", async (id) => {
  try {
    const res = await customAPI().get(`/users/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data.payload;
  }
});

// export const editUser = createAsyncThunk(
//   "users/editUser",
//   async (arg) => {
//     try {
//       const res = await customAPI().put(`/users/${arg.id}`, arg);
//       console.log(res)
//       return res.data;
//     } catch (err) {
//       return err.response.data.payload;
//     }
//   }
// );
export const editUser = createAsyncThunk("users/editUser", async (profile) => {
  return axios
    .put(`http://127.0.0.1:8181//users/${profile.id}`, profile)
    .then((data) => {
      console.log(data.data.data);
      return data.data.data;
    })
    .catch((err) => {
      console.log(err)
    });
});

export const logout = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("token");
  return undefined;
});
