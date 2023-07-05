import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyNumber from "./MyNumber";
import { Button, Stack } from "@mui/material";
import BeforeMyNumberImg from "./BeforeMyNumberImg";
import AffterMyNumberImg from "./AffterMyNumberImg";
import { useFormik } from "formik";
import { useUserProfile } from "../../../customHook/useUserProfile";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { editUser } from "../../../services/useService";
export default function Content({ setOpenRegister }) {
  const dispatch = useDispatch();
  const profile = useUserProfile();
  const [sttUpdate, setSttUpdate] = useState("");
  console.log(sttUpdate);
  console.log(profile);

  const validationSchema = Yup.object().shape({
    numberCard: Yup.string()
      .required("Vui lòng nhập số CCCD/CMTND")
      .matches(/^\d{12}$/, "Số CCCD/CMTND phải có 12 chữ số"),
    beforeImageCard: Yup.string().required("Vui lòng chọn ảnh mặt trước!"),
    afterImageCard: Yup.string().required("Vui lòng chọn ảnh mặt sau!"),
  });

  const formik = useFormik({
    initialValues: {
      update:"pending",
      numberCard: "",
      beforeImageCard: "",
      afterImageCard: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { ...rest } = values;
      const newProfile = {
        id: profile.id,
        ...rest,
      };

      dispatch(editUser(newProfile))
        .then(() => {
          setSttUpdate("pending");
          Swal.fire({
            icon: "success",
            title: "Gửi thông tin thành công, hãy đợi phê duyệt",
            showConfirmButton: false,
            timer: 2500,
          });
          setOpenRegister(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    console.log(111111111111111)
    setSttUpdate(profile?.update);
  }, [profile]);

  return (
    <>
      {sttUpdate === "pending" ? (
        <Stack sx={{ width: "100%" }} textAlign={"center"}>
          <Typography variant="h3" gutterBottom color={"green"}>
            <TaskAltIcon sx={{ fontSize: "100px" }} />
          </Typography>
          <Typography variant="h3" gutterBottom color={"green"}>
            Thông tin của bạn đã được gửi đi.
          </Typography>
          <Typography variant="h3" gutterBottom color={"green"}>
            Hãy đợi admin phê duyệt.
          </Typography>
        </Stack>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color={"red"}
            >
              * Hãy nhập số CCCD/CMTND và 2 mặt để đăng ký
            </Typography>
            <MyNumber formik={formik} />
            <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
              <BeforeMyNumberImg formik={formik} />
              <AffterMyNumberImg formik={formik} />
            </Stack>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Gửi
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
