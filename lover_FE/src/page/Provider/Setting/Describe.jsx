import { Stack, TextareaAutosize, Typography } from "@mui/material";
import React from "react";

export default function Describe({ formik }) {
  const { values } = formik;

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    formik.setFieldValue("desc", newValue);
  };

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Mô tả bản thân
      </Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={7}
        placeholder="Hãy viết gì đó"
        style={{ resize: "none", padding: "5px", borderRadius: "5px" }}
        name="desc"
        value={values.desc}
        onChange={handleInputChange}
      />
    </Stack>
  );
}
