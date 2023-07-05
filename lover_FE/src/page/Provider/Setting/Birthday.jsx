import React, { useEffect } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, Typography } from "@mui/material";

export default function Birthday({ formik }) {
  const { values } = formik;
  const initialValues = JSON.parse(sessionStorage.getItem("formikValues")) || {};

  const [value, setValue] = React.useState(() => {
    const storedValue = sessionStorage.getItem("dob");
    return dayjs(storedValue || initialValues.dob, "MM/DD/YYYY");
  });

  const handleInputChange = (newValue) => {
    setValue(newValue);
    formik.setFieldValue("dob", newValue.format("MM/DD/YYYY"));
  };

  useEffect(() => {
    sessionStorage.setItem("formikValues", JSON.stringify(values));
  }, [values]);

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Sinh nhật
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleInputChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Stack>
  );
}
