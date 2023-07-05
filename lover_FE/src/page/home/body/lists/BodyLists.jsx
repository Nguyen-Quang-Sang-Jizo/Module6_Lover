import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../../../services/typeService";
import { useEffect } from "react";
import { getServices } from "../../../../services/serviceService";
import { Outlet, useNavigate } from "react-router-dom";
import { getServiceProvider } from "../../../../services/serviceProviderService";


const CustomTab = ({ label, ...props }) => {
  return (
    <Tab
      sx={{
        borderRadius: "8px",
        backgroundColor: "customBtnColor.backgroundColor",
        color: "customBtnColor.color",
        margin: "10px",
        padding: "0 15px",
        minHeight: "35px",
        textTransform: "none",
        "&.Mui-selected": {
          backgroundColor: "customSelected.backgroundColor",
          color: "customSelected.color",
        },
      }}
      label={label}
      {...props}
    />
  );
};

export default function BodyLists({ service, setService }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const services = useSelector((state) => state.service.service);
  const [value, setValue] = React.useState(0);
  const [showService, setShowService] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleServiceToggle = (serviceId) => {
    dispatch(getServiceProvider(serviceId));
  };
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getServices(1));
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            position: "fixed",
            zIndex: 1,
            backgroundColor: "customColorSchemes.basicColor",
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <CustomTab
            label="Tất cả"
            onClick={() => {
              navigate("");
            }}
          />
          {services?.map((item) => {
            return (
              <CustomTab
                key={item.id}
                label={item.name}
                onClick={() => handleServiceToggle(item?.id)}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ marginTop: "48px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
