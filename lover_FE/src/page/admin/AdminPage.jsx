import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, findAllUser } from "../../services/adminService";

import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.listUser);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    dispatch(findAllUser());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChange = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const newRoleId = user.role.id === 1 ? 3 : 1;
        return {
          ...user,
          role: {
            id: newRoleId,
            name: newRoleId === 3 ? "provider" : "user",
          },
        };
      }
      return user;
    });

    const selectedUser = updatedUsers.find((user) => user.id === userId);
    dispatch(changeRole({ users: updatedUsers, user: selectedUser })); // Truyền chỉ user có ID tương ứng vào hàm changeRole
    showNotification("");
  };

  const displayedUsers = Array.isArray(users)
    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  const showNotification = (message) => {
    setNotification({
      open: true,
      message,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      open: false,
      message: "",
    });
  };

  return (
    <Box
      sx={{
        display: "block",
        height: "100vh",
        marginTop: "65px",
        flexGrow: 1,
        backgroundColor: "customColorSchemes.bgColorPage",
        padding: "50px 10px",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>CCCD/CMT</TableCell>
              <TableCell>Nâng cấp</TableCell>
              <TableCell>Vai trò</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{item.numberCard || "N/A"}</TableCell>
                  <TableCell>{item.update}</TableCell>
                  <TableCell>
                    {item.role.id === 2 ? (
                      item.role.name
                    ) : (
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>{item.role.name}</Grid>
                        <Grid item sx={{ marginLeft: "auto" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={item.role.id === 3}
                                onChange={() =>
                                  handleRoleChange(item.id, item.role.id)
                                }
                              />
                            }
                            label=""
                          />
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ width: "100vw" }}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={6}
          count={Array.isArray(users) ? users.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Snackbar
        open={notification.open}
        // message={notification.message}
        onClose={handleCloseNotification}
        autoHideDuration={3000}
      >
        <Alert sx={{ width: "100%" }}>Thay đổi thành công!</Alert>
      </Snackbar>
    </Box>
  );
};

export default HomeAdmin;
