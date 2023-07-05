import React from "react";
import { useUserProfile } from "../../customHook/useUserProfile";
import { Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddProvider from "./Setting/AddProvider";

export default function ServiceSetting() {
  const user = useUserProfile();

  return (
    <>
      {user?.role.name === "user" ? (
        <Typography variant="h3" gutterBottom color="red">
          <RemoveCircleOutlineIcon fontSize="" />
          Bạn không thể sử dụng tín năng này
        </Typography>
      ) : (
        <AddProvider />
      )}
    </>
  );
}
