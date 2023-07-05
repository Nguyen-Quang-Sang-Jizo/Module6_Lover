import React, { useState, useEffect } from "react";
import { Country, City } from "country-state-city";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const CountryAndCityComponent = ({ formik }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    if (formik.values.country) {
      setSelectedCountry(formik.values.country);
      setCityData(City.getCitiesOfCountry(formik.values.country));
    }
    if (formik.values.city) {
      setSelectedCity(formik.values.city);
    }
  }, [formik.values.country, formik.values.city]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setCityData(City.getCitiesOfCountry(countryCode));
    setSelectedCity("");
    formik.handleChange(event); // Call formik.handleChange to update formik values
  };

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    displayValue: country.name,
  }));

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    formik.handleChange(event); // Call formik.handleChange to update formik values
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="subtitle2" gutterBottom>
          Quốc gia
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="country-label"
            value={selectedCountry}
            onChange={handleCountryChange}
            name="country" // Set the name attribute for formik to recognize
          >
            {countryData.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.displayValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedCountry && (
        <Grid item xs={6}>
          <Typography variant="subtitle2" gutterBottom>
            Thành phố
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="city-label"
              value={selectedCity}
              onChange={handleCityChange}
              name="city" // Set the name attribute for formik to recognize
            >
              {cityData.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default CountryAndCityComponent;
