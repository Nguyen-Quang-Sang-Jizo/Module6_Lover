import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/NavBar";
import { Box } from "@mui/material";
const Index = () => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>

      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Index;
