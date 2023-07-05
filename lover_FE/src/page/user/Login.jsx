import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../services/useService";
import * as yup from "yup";

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
  username: yup.string().required("Không được để trống"),
  password: yup.string().required("Không được để trống"),
});

export default function Login(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (user) => {
      dispatch(login(user))
        .then((data) => {

          if (data.payload.err === "Password is wrong") {
            setErrorMessage("Sai tên đăng nhập hoặc mật khẩu.");
          } else if (data.payload.err === "User is not exist") {
            setErrorMessage("Tài khoản không tồn taị.");
          } else {
            setErrorMessage("");
            props.setOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

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
          <FavoriteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box sx={{ mt: 1 }} noValidate>
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
            <TextField
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {errorMessage && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  props.setSignIn(true);
                }}
              >
                {"Bạn không có tài khoản? Tạo ngay"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
