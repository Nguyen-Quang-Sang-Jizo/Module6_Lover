import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function MyNumber({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack >
      <Typography variant="subtitle2" gutterBottom>
        Số CCCD/CMTND
      </Typography>
      <TextField
        multiline
        name="numberCard"
        value={values.name}
        onChange={handleChange}
        error={formik.touched.numberCard && Boolean(formik.errors.numberCard)}
          helperText={formik.touched.numberCard && formik.errors.numberCard}
      />
    </Stack>
  );
}
