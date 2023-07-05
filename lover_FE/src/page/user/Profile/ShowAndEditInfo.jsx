import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../../services/useService.js";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  Modal,
  Fade,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Snackbar } from "@mui/material";
import { storage } from "../../../services/firebase.js";
import { v4 } from "uuid";
import { useUserProfile } from "../../../customHook/useUserProfile.js";

const ShowAndEditInfo = () => {
  const dispatch = useDispatch();

  const profile = useUserProfile();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    phoneNumber: "",
    email: "",
    identityCard: "",
    avatar: "",
  });

  const [imageUpload, setImageUpload] = useState(null);
  const [tempAvatar, setTempAvatar] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
    setTempAvatar(formState.avatar); // Lưu trữ ảnh tạm thời
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTempAvatar(""); // Xóa giá trị của tempAvatar
  };

  const handleSubmitEditProfile = async (event, data) => {
    setSnackbarMessage("Cập nhật thành công");
    setSnackbarOpen(true);
    event.preventDefault();

    const editProfile = {
      id: profile.id,
      ...formState,
    };

    let res = await dispatch(editUser(editProfile));
  };

  const handleChangeImage = (event) => {
    event.preventDefault();
    if (event.target.files.length === 0) return;

    const image = event.target.files[0];
    const imageRef = ref(storage, `images/${image.name + v4()}`);

    uploadBytes(imageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setTempAvatar(url);
      })
      .catch((error) => {
        // Handle any error occurred during image upload
        console.log(error);
      });
  };

  const handleSaveImage = async () => {
    let res = await dispatch(editUser({ ...formState, avatar: tempAvatar }));
    if (res.error) {
    } else {
      setFormState({ ...formState, avatar: tempAvatar }); // Update the formState with the new avatar URL
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (profile) {
      setFormState(profile);
    }
  }, [profile]);

  return (
    <>
      <Grid container spacing={2} p={4}>
        <Grid xs={4}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
              margin: "0 8px",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              TỔNG TIỀN ĐÃ NẠP
            </Typography>
            <Typography variant="h5" gutterBottom color="red">
              0 Đ
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
              margin: "0 8px",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              TỔNG TIỀN ĐÃ DONATE
            </Typography>
            <Typography variant="h5" gutterBottom color="red">
              0 Đ
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
              margin: "0 8px",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              SỐ GIỜ ĐÃ THÊU
            </Typography>
            <Typography variant="h5" gutterBottom color="red">
              0 Đ
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Thông tin cá nhân
        </Typography>

        <form>
          {profile && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "75%",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    className="hover-image"
                    component="img"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    image={formState.avatar}
                    alt="Avatar"
                  />
                </Box>
                <Box onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
                  <Typography color="red">Thay đổi</Typography>
                  <Typography>JPG, GIF OR PND</Typography>
                </Box>
              </Box>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
              >
                <Fade in={open}>
                  <div
                    className="modal-paper"
                    style={{
                      background: "white",
                      width: 350,
                      height: 450,
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {tempAvatar && (
                      <img
                        src={tempAvatar}
                        alt="Preview"
                        style={{
                          width: "300px",
                          height: "300px",
                          objectFit: "contain",
                          margin: "10px 0 0 25px",
                        }}
                      /> // set width and height of image to 400px and 300px respectively
                    )}

                    <form>
                      <div className="mb3">
                        <input
                          style={{ marginLeft: 10 }}
                          id="exampleInput"
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChangeImage}
                        />
                      </div>
                    </form>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "5px",
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleSaveImage}
                        style={{ float: "right", marginLeft: "10px" }}
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCloseModal}
                        style={{ float: "right" }}
                      >
                        Thoát
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>

              <Box sx={{ width: "70ch", marginTop: "50px" }}>
                <Box>
                  <Typography variant="overline" gutterBottom>
                    HỌ
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    defaultValue={formState.firstname}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        firstname: event.target.value,
                      })
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="overline" gutterBottom>
                    TÊN
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    defaultValue={formState.lastname}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        lastname: event.target.value,
                      })
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="overline" gutterBottom>
                    ĐỊA CHỈ
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    defaultValue={formState.address}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        address: event.target.value,
                      })
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="overline" gutterBottom>
                    SỐ ĐIỆN THOẠI
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    defaultValue={formState.phoneNumber}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        phoneNumber: event.target.value,
                      })
                    }
                  />
                </Box>

                <Box>
                  <Typography variant="overline" gutterBottom>
                    Email
                  </Typography>
                  <TextField
                    disabled
                    fullWidth
                    multiline
                    defaultValue={profile?.email}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckIcon sx={{ color: "green" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Divider sx={{ marginTop: 3 }} />
              </Box>
              <Box sx={{ width: "70ch", marginTop: 3 }}>
                <Button
                  onClick={handleSubmitEditProfile}
                  variant="contained"
                  fullWidth
                  sx={{
                    color: "white",
                    padding: "10px",
                    bgcolor: "red",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Box>
          )}
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        sx={{
          width: "20%",
          "& .MuiAlert-root": {
            width: "100%",
            fontSize: "1.3rem",
            fontWeight: "bold",
          },
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShowAndEditInfo;
