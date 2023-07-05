import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { otp, register } from "../../services/useService";
import { TextField } from "@mui/material";
import { useFormik } from "formik";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Không được để trống!")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: yup
    .string()
    .required("Không được để trống!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: yup.string().required("Không được để trống!"),
  otpValue: yup.number().required("Hay nhập!"),
});

export default function Register(props) {
  const dispatch = useDispatch();

  const [showInput, setShowInput] = React.useState(false);
  const [errRegex, setErrRegex] = React.useState("");
  const [style, setStyle] = React.useState(false);

  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

  const handleChangeLogin = () => {
    props.setSignIn(false);
  };
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errUsernameMess, setErrUsernameMess] = React.useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      otpValue: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(register(values))
        .then((data) => {
        if (data.payload === "trung tai khoan"){
          setErrorMessage("Tai khoan da ton tai")
        }else if(data.payload === "sai otp"){
          setErrorMessage("")
          setErrRegex("Sai ma otp")
        }else{
          alert("dang ky ok")
          handleChangeLogin()
        }
        })
        .catch(() => {});
    },
  });

  const handleButtonChange = () => {
    if (emailRegex.test(formik.values.email)) {
      setErrRegex("");
      dispatch(otp(formik.values.email))
        .then((data) => {
          if (data.payload === "email đã được đăng kí o tai khoan khac") {
            setErrRegex("Email này đã được sử dụng");
          } else {
            setErrRegex("");
            alert("Check mail de lay ma");
            setStyle(true);
            setShowInput(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowInput(false);
      setErrRegex("Sai định dạng email");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <VolunteerActivismIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              id="username"
              name="username"
              placeholder="Tài khoản"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            {errorMessage && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <TextField
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              id="password"
              name="password"
              placeholder="Mat khau"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Grid
              container
              spacing={1}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item>
                <TextField
                  sx={{ mt: 3, mb: 2 }}
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  disabled={style}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              {showInput && (
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    placeholder="OTP"
                    name="otpValue"
                    value={formik.values.otpValue}
                    onChange={formik.handleChange}
                    error={formik.touched.otpValue && Boolean(formik.errors.otpValue)}
                    helperText={formik.touched.otpValue && formik.errors.otpValue}
                  />
                </Grid>
              )}
              {!showInput && (
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleButtonChange}
                    sx={{padding:"12px"}}
                  >
                    Gửi
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <div style={{ color: "red", fontSize: "14px" }}>{errRegex}</div>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  props.setSignIn(false);
                }}
              >
                Bạn đã có tài khoản? Đăng nhập ngay.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}