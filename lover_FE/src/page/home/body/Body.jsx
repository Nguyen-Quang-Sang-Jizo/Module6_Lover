import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SiderBar from "./siderbar/SiderBar";
import BodyLists from "./lists/BodyLists";

export default function Body() {
  const [service,setService] = useState([]);



  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "64px",
        height: "100vh",
      }}
    >
      <SiderBar setService={setService}/>
      <BodyLists service={service} setService={setService}/>
    </Box>
  );
}
