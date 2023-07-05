import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Stack, Typography } from "@mui/material";

export default function Gender({ formik }) {
  const { values, handleChange } = formik;

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Giới tính
      </Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="sex"
          value={values.sex}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Nam"
            control={<Radio />}
            label="Nam"
            checked={values.sex === "Nam"}
          />
          <FormControlLabel
            value="Nu"
            control={<Radio />}
            label="Nữ"
            checked={values.sex === "Nu"}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
