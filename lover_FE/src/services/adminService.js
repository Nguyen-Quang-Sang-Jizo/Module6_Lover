import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";

export const findAllUser = createAsyncThunk(
  "admin/findAllUser",
  async () => {
      try {
          const res = await customAPI().get("/admin/find-all");
          return res.data.data.docs;
      } catch (err) {
          return err.response?.data?.payload;
      }
  }
);

// export const changeRole = createAsyncThunk(
//   "admin/changeRole",
//   async ({ users, id, newRoleId }) => {
//     console.log(users, id, newRoleId);
//     try {
//       const updatedUser = await customAPI().put(`admin/${id}`, { role: newRoleId });
//       return {
//         users,
//         updatedUser,
//       };
//     } catch (err) {
//       return err.response?.data?.payload;
//     }
//   }
// );

export const changeRole = createAsyncThunk(
  "admin/changeRole",
  async ({users, user}) => {
    try {
      await customAPI().put(`admin/${user.id}`, { role: user.role.id });
      return users;
    } catch (err) {
      return err.response?.data?.payload;
    }
  
  }
);

export const lockAccount = createAsyncThunk("admin/lockAccount", async (id) => {
  try {
    const res = await customAPI().put(`/admin/lock-user/${id}`);
  } catch (err) {
    return err.response?.data?.payload;
  }
});

export const openAccount = createAsyncThunk("admin/openAccount", async (id) => {
  try {
    const res = await customAPI().put(`/admin/open-user/${id}`);
  } catch (err) {
    return err.response?.data?.payload;
  }
});
