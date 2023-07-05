import React, { useState, useEffect } from "react";
import { storage } from "../../../services/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ImageUploader = ({ formik, image }) => {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setImages(image || []);
  }, [image]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage);
    const timestamp = Date.now();
    const fileRef = ref(storageRef, `${timestamp}_${file.name}`);

    try {
      if (images.length < 4) {
        await uploadBytes(fileRef, file);
        const imageUrl = await getDownloadURL(fileRef);
        const newImages = [...formik.values.image, imageUrl];
        setImages(newImages);
        formik.setFieldValue("image", newImages);
      } else {
        setErrorMessage("Chỉ được tải lên tối đa 4 ảnh");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setSelectedImage(images[index]);
    setDialogOpen(true);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...formik.values.image];
    newImages.splice(index, 1);
    setImages(newImages);
    formik.setFieldValue("image", newImages);
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <label htmlFor="upload-input">
        <Button variant="contained" component="span">
          Tải lên
        </Button>
      </label>
      <Input
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
        id="upload-input"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="error" onClose={handleSnackbarClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Stack direction="row" spacing={2}>
        {images.map((image, index) => (
          <Card
            key={index}
            onClick={() => handleImageClick(index)}
            sx={{
              width: 150,
              height: 150,
              cursor: "pointer",
              ...(selectedIndex === index && { backgroundColor: "lightblue" }),
            }}
          >
            <CardMedia component="img" src={image} alt={`Image ${index}`} />
          </Card>
        ))}
      </Stack>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth={"lg"}>
        <DialogContent>
          <DialogContentText>
            <img src={selectedImage} alt="Selected Image" style={{ width: "100%" }} />
          </DialogContentText>
          <Button variant="contained" color="error" onClick={() => handleDeleteImage(selectedIndex)}>
            Xóa
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUploader;
