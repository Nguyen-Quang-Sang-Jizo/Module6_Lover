import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Interest({ formik }) {
  const { values } = formik;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    formik.setFieldValue("hobby", newValue);
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Sở thích
      </Typography>
      <TextField
        fullWidth
        multiline
        name="hobby"
        value={values.hobby}
        onChange={handleInputChange}
      />
    </Stack>
  );
}
