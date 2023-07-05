import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import { storage } from "../../../services/firebase.js";

const defaultAvatar =
  "https://cmcts.com.vn/media/data/users/quet-thong-tin-cccd.jpg";

const UploadCard = styled(Card)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
`;

const UploadMedia = styled(CardMedia)`
  width: 350px;
  height: 200px;
  transition: opacity 0.3s;
  object-fit: "container";
  &:hover {
    opacity: 0.5;
  }
`;

const UploadButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export default function AffterMyNumberImg({ formik }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setTimeout(() => {
        handleUpload(selectedFile);
      }, 0);
    }
  };

  const handleUpload = (selectedFile) => {
    setUploadDisabled(true);
    setUploading(true);

    const storageRef = ref(storage);
    const timestamp = Date.now();
    const fileName = `image_${timestamp}`;
    const fileRef = ref(storageRef, fileName);

    uploadBytes(fileRef, selectedFile)
      .then((snapshot) => {
        console.log("Tải lên thành công");
        getDownloadURL(fileRef)
          .then((url) => {
            console.log("URL của ảnh:", url);
            setFile(null);
            setUploading(false);
            setUploadDisabled(false);
            formik.setFieldValue("afterImageCard", url);
            setAvatarUrl(url);
          })
          .catch((error) => {
            console.log("Lỗi khi lấy URL của ảnh:", error);
            setFile(null);
            setUploading(false);
            setUploadDisabled(false);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi tải lên ảnh:", error);
        setFile(null);
        setUploading(false);
        setUploadDisabled(false);
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload-input1"
      />
      <Typography variant="subtitle2" gutterBottom>
        Mặt sau
      </Typography>
      <label htmlFor="file-upload-input1">
        <UploadCard>
          <UploadMedia
            component="img"
            alt="Uploaded Image"
            image={file ? URL.createObjectURL(file) : avatarUrl}
          />
          {file && (
            <UploadButton
              variant="contained"
              color="primary"
              onClick={() => handleUpload(file)}
              disabled={uploading || uploadDisabled}
            >
              {uploading && <CircularProgress size={20} />}
            </UploadButton>
          )}
        </UploadCard>
      </label>
      {formik.touched.afterImageCard && formik.errors.afterImageCard && (
        <Typography variant="body2" color="error" mt={1}>
          {formik.errors.afterImageCard}
        </Typography>
      )}
    </div>
  );
}
