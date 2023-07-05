import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Typography } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function FreeService({ formik }) {
  const [freeServices, setFreeServices] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDefaultSet, setIsDefaultSet] = useState({
    id: "",
    title: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8181/services/free")
      .then((response) => {
        const arr = response.data.data.reverse()
        setFreeServices(arr);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const options = freeServices.map((service) => ({
    id: service.id,
    title: service.name,
    type: service.type.id,
  }));

  const isOptionSelected = (option) => {
    return isDefaultSet.some((service) => {
      return service.id === option.id;
    });
  };

  const handleAutocompleteChange = (event, value) => {
    if (value?.length > 0) {
      for (let i = 0; i < value.length; i++) {
        for (let j = i + 1; j < value.length; j++) {
          if (value[i].id === value[j].id) {
            value.splice(j, 1);
            value.splice(i, 1);
          }
        }
      }
    }
    setIsDefaultSet(value);
    formik.setFieldValue("freeService", value);
  };

  useEffect(() => {
    const arr = [];
    if (formik?.initialValues.service) {
      for (let i of formik.initialValues.service) {
        if (i.service.type.id === 2) {
          let a = {
            id: i.service.id,
            title: i.service.name,
            type: i.service.type.id,
          };
          arr.push(a);
        }
      }
      setIsDefaultSet(arr);
    }
  }, [formik.initialValues.service]);

  return (
    <Stack>
      <Typography variant="subtitle2" gutterBottom>
        Dịch vụ miễn phí
      </Typography>
      <Autocomplete
        fullWidth
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        value={isDefaultSet}
        onChange={handleAutocompleteChange}
        renderOption={(props, option) => {
          const selected = isOptionSelected(option);
          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          );
        }}
        style={{ width: 615 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
