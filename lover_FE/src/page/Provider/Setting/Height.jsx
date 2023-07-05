import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Height({ formik }) {
  const { values,handleChange } = formik;
  return (
    <>
      <Stack>
        <Typography variant="subtitle2" gutterBottom>
          Chiều cao
        </Typography>
        <TextField
          sx={{ width: 300 }}
          multiline
          placeholder="cm"
          name="height"
          value={values.height}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}

