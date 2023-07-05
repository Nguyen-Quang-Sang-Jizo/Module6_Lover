import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Price({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Giá
      </Typography>
      <TextField
        fullWidth
        multiline
        name="price"
        value={values.price}
        onChange={handleChange}
      />
    </Stack>
  );
}
