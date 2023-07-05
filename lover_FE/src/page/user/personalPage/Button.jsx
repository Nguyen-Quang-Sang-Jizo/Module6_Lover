import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../utils";

export default function InforButton() {
  const navigate = useNavigate()
  const handleSetting = () =>{
    navigate("/customer_info");
    clearLocalStorage()
    window.location.reload();
  }
  return (
    <Box sx={{ flexGrow: 1, padding: "15px" }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<FavoriteIcon />}
            sx={{
              color:"black",
              bgcolor: "white",
              padding: "10px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Theo dõi
          </Button>
        </Grid>
        <Grid item xs={6}>
          
            <Button
              variant="contained"
              fullWidth
              onClick={handleSetting}
              sx={{
                color:"black",
                bgcolor: "white",
                padding: "10px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Cài đặt
            </Button>
          
        </Grid>
        <Grid item xs={6}>
          <Button
            sx={{ padding: "10px" }}
            variant="contained"
            fullWidth
            startIcon={<ChatBubbleOutlineIcon />}
            disabled
          >
            Chat
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled
            sx={{ padding: "10px" }}
          >
            Donate
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color:"black",
              bgcolor: "white",
              padding: "10px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Đang theo dõi
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            textTransform="none"
            fullWidth
            sx={{
              color:"black",
              bgcolor: "white",
              padding: "10px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Album
          </Button>
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{
          marginTop: "5px",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        Khu thành viên
      </Button>
    </Box>
  );
}
