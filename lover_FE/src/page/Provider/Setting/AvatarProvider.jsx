import React, { useState } from "react";
import { Button, CircularProgress, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import { storage } from "../../../services/firebase.js";

const defaultAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1tIN7bLCtTahSC_uHsM7X-aHZwHRgmT7LQ&usqp=CAU";

const UploadCard = styled(Card)`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const UploadMedia = styled(CardMedia)`
  width: 150px;
  height: 150px;
  transition: opacity 0.3s;
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

export default function AvatarProvider({ formik }) {
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
            formik.setFieldValue("avatarProvider", url);
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
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input">
        <UploadCard>
          <UploadMedia
            component="img"
            alt="Uploaded Image"
            image={
              file
                ? URL.createObjectURL(file)
                : formik.values.avatarProvider || avatarUrl
            }
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
    </div>
  );
}
