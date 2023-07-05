import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  Modal,
  Fade,
  Typography,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../services/firebase";
import { useUserProfile } from "../../customHook/useUserProfile";
import { editUser } from "../../services/useService";
import Swal from "sweetalert2";

export default function AdvanceSetting() {
  const dispatch = useDispatch();

  const profile = useUserProfile();

  const [formState, setFormState] = useState({
    numberCard: "",
    avatar: "",
    beforeImageCard: "",
    afterImageCard: "",
  });

  const [tempAvatar, setTempAvatar] = useState("");
  const [open, setOpen] = useState(false);
  const [beforeImageCardUpload, setBeforeImageCardUpload] = useState(null);
  const [beforeImageUrls, setBeforeImageUrls] = useState(null);
  const [afterImageCardUpload, setAfterImageCardUpload] = useState(null);
  const [afterImageUrls, setAfterImageUrls] = useState(null);

  const handleOpenModal = () => {
    setOpen(true);
    setTempAvatar(formState.avatar);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTempAvatar("");
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
        console.log(error);
      });
  };

  const uploadFile = (event) => {
    event.preventDefault();
    if (beforeImageCardUpload == null) return;
    const imageRef = ref(storage, `images/${afterImageCardUpload.name + v4()}`);
    uploadBytes(imageRef, beforeImageCardUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setBeforeImageUrls(url);
        setFormState((prevState) => ({
          ...prevState,
          beforeImageCard: url,
        }));
      });
    });
  };

  const uploadFilecbc = (event) => {
    event.preventDefault();
    if (afterImageCardUpload == null) return;
    const imageRef = ref(storage, `images/${afterImageCardUpload.name + v4()}`);
    uploadBytes(imageRef, afterImageCardUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setAfterImageUrls(url);
        setFormState((prevState) => ({
          ...prevState,
          afterImageCard: url,
        }));
      });
    });
  };

  const handleSaveImage = async () => {
    setFormState({ ...formState, avatar: tempAvatar });

    let res = await dispatch(editUser({ ...formState, avatar: tempAvatar }));
    if (res.error) {
      // Handle error
    } else {
      handleCloseModal();
    }
  };

  const handleSubmitEditProfile = async (event, data) => {
    event.preventDefault();

    const editProfile = {
      id: profile.id,
      ...formState,
      beforeImageCard: beforeImageUrls || formState.beforeImageCard,
      afterImageCard: afterImageUrls || formState.afterImageCard,
    };

    let update = await dispatch(editUser(editProfile));

    if (update) {
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công! Vui lòng chờ xác thực.",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      // Xử lý lỗi
    }
  };

  useEffect(() => {
    if (profile) {
      setFormState(profile);
      setBeforeImageUrls(profile.beforeImageCard);
      setAfterImageUrls(profile.afterImageCard);
    }
  }, [profile]);

  return (
    <>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Thông tin cá nhân
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <Typography variant="h5" sx={{ marginRight: "16px" }}>
                  Hình đại diện
                </Typography>
                {tempAvatar ? (
                  <Box
                    component="img"
                    src={tempAvatar}
                    sx={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "16px",
                    }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={formState.avatar || "/assets/user.png"}
                    sx={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "16px",
                    }}
                  />
                )}
                <Button
                  variant="outlined"
                  component="label"
                  onChange={(event) => handleChangeImage(event)}
                >
                  Tải lên hình mới
                  <input type="file" hidden accept="image/*" />
                </Button>
              </Box>
              <Divider />
              <Stack direction={"column"} p={2}>
                <Typography variant="h5" sx={{ marginRight: "16px" }}>
                  Thay đổi số thẻ
                </Typography>

                <TextField
                  sx={{ width: "500px", marginTop:"10px" }}
                  required
                  placeholder="Số CCCD/CMTND"
                  variant="outlined"
                  value={formState.numberCard}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      numberCard: e.target.value,
                    })
                  }
                />
              </Stack>

              <Divider />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" sx={{ marginTop: "16px" }}>
                    Ảnh mặt trước CCCD
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setBeforeImageCardUpload(event.target.files[0])
                      }
                    />
                    {beforeImageUrls ? (
                      <Button
                        onClick={() => {
                          setBeforeImageUrls(null);
                          setFormState((prevState) => ({
                            ...prevState,
                            beforeImageCard: "",
                          }));
                        }}
                      >
                        Xóa hình
                      </Button>
                    ) : (
                      <Button onClick={uploadFile}>Tải lên</Button>
                    )}
                  </Box>
                  <Box
                    component="img"
                    src={beforeImageUrls || formState.beforeImageCard}
                    sx={{
                      width: "400px",
                      height: "200px",
                      objectFit: "contain",
                      marginTop: "16px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" sx={{ marginTop: "16px" }}>
                    Ảnh mặt sau CCCD
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setAfterImageCardUpload(event.target.files[0])
                      }
                    />
                    {afterImageUrls ? (
                      <Button
                        onClick={() => {
                          setAfterImageUrls(null);
                          setFormState((prevState) => ({
                            ...prevState,
                            afterImageCard: "",
                          }));
                        }}
                      >
                        Xóa hình
                      </Button>
                    ) : (
                      <Button onClick={uploadFilecbc}>Tải lên</Button>
                    )}
                  </Box>
                  <Box
                    component="img"
                    src={afterImageUrls || formState.afterImageCard}
                    sx={{
                      width: "400px",
                      height: "200px",
                      objectFit: "contain",
                      marginTop: "16px",
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                type="submit"
                onClick={(e) => handleSubmitEditProfile(e, formState)}
                sx={{ marginTop: "24px" }}
              >
                Lưu thông tin
              </Button>
            </Box>
          )}
        </form>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              boxShadow: 24,
              p: 4,
              maxWidth: "500px",
              minWidth: "300px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4" id="modal-title" gutterBottom>
              Cập nhật hình đại diện
            </Typography>

            <Box
              component="img"
              src={tempAvatar || formState.avatar || "/assets/user.png"}
              sx={{
                width: "80%",
                height: "auto",
                objectFit: "contain",
                margin: "16px auto",
              }}
            />

            <Box
            //   sx={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ marginRight: "16px" }}
                onChange={(event) => handleChangeImage(event)}
              >
                Tải lên hình mới
                <input type="file" hidden accept="image/*" />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveImage}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
