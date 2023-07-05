import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Weight({ formik }) {
  const { values, handleChange } = formik;

  return (
    <>
      <Stack>
        <Typography variant="subtitle2" gutterBottom>
          Cân nặng
        </Typography>
        <TextField
          placeholder="kg"
          multiline
          sx={{ width: 300 }}
          name="weight"
          value={values.weight}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}
