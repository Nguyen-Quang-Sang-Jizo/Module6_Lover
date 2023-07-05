import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function NickName({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Nick name
      </Typography>
      <TextField
        fullWidth
        multiline
        name="name"
        value={values.name}
        onChange={handleChange}
      />
    </Stack>
  );
}
