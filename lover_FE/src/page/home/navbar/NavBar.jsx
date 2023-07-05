import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeToggle from "../../../theme/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import UserIcons from "../../user/UserIcons";
import PersonIcon from "@mui/icons-material/Person";
import BasicModal from "../../user/Modal";
import { searchProviders } from "../../../services/providerService.js";
import { Link, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils";

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
      width: "40ch",
    },
  },
}));

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleOpen = () => setOpen(true);

  const goHome = () => {
    clearLocalStorage();
    navigate("/");
  };

  const user = useSelector(({ user }) => {
    return user.currentUser;
  });

  let handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSearch = async (searchName) => {
    if (searchName !== "") {
      let abc = await dispatch(searchProviders(searchName));
      setName("");
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "customColorSchemes.backgroundColor",
        }}
      >
        <Toolbar>
          <FavoriteIcon
            sx={{ mr: 2, color: "red", cursor: "pointer" }}
            onClick={goHome}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", color: "red" } }}
          >
            Love&Love
          </Typography>
          <Box sx={{ flexGrow: 1.3 }} />
          <Search sx={{ color: "customColorSchemes.textColor" }}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={name}
              onChange={handleInput}
            />
            <SearchIcon onClick={() => handleSearch(name)} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              borderRight: "1px solid gray",
              padding: "0 15px",
            }}
          >
            {!user ? (
              <IconButton onClick={handleOpen}>
                <PersonIcon />
              </IconButton>
            ) : (
              <UserIcons />
            )}
            <BasicModal open={open} setOpen={setOpen} />
          </Box>
          <ModeToggle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
