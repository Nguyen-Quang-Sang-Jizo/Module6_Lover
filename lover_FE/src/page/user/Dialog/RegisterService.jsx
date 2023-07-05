import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Content from "./Content";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  p: 4,
};

export default function RegisterService({ openRegister, setOpenRegister }) {
  const handleOpen = () => setOpenRegister(true);
  const handleClose = () => setOpenRegister(false);

  return (
    <div>
      <Modal
        keepMounted
        open={openRegister}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <IconButton
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Đăng ký cung cấp dịch vụ
            </Typography>
          </Box>
          <Divider sx={{mt:"20px", mb:"30px"}}/>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <Content setOpenRegister={setOpenRegister} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
