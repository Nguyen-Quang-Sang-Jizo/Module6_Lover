import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

import React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: " 0 10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1px solid gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "28ch",
    },
  },
}));

export default function SearchInput() {
  return (
    <>
      <Search sx={{ color: "customColorSchemes.textColor" ,backgroundColor:"customColorSchemes.backgroundColor" }}>
        <StyledInputBase
          placeholder="Tìm kiếm bài đăng"
          inputProps={{ "aria-label": "search" }}
          // value={name}
          // onChange={handleInput}
        />
        <SearchIcon  />
      </Search>
    </>
  );
}
