import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function LinkFB({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Link facebook
      </Typography>
      <TextField
        fullWidth
        multiline
        name="linkFB"
        value={values?.linkFB}
        onChange={handleChange}
      />
    </Stack>
  );
}