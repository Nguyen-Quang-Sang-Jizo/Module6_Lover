// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   changeRole,
//   findAllUser,
//   updateRole,
// } from "../../services/adminService";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { TableControl } from "react-bootstrap-table-control";
// import { Box, FormControlLabel, Grid, Switch, Button } from "@mui/material";

// const HomeAdmin = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.admin.listUser);

//   useEffect(() => {
//     dispatch(findAllUser());
//   }, [dispatch]);

//   const handleSwitchChange = (userId) => {
//     const updatedUsers = users.map((user) => {
//       if (user.id === userId) {
//         const newRoleId = user.role.id === 1 ? 2 : 1;
//         return {
//           ...user,
//           role: { id: newRoleId, name: newRoleId === 2 ? "provider" : "user" },
//         };
//       }
//       return user;
//     });

//     dispatch(changeRole(updatedUsers));
//   };

//   const handleButtonClick = (userId, newRoleId) => {
//     dispatch(updateRole({ id: userId, newRoleId }));
//   };

//   const tableHeader = [
//     { key: "id", name: "#" },
//     { key: "username", name: "Tên tài khoản" },
//     { key: "email", name: "Email" },
//     { key: "phone", name: "Số điện thoại" },
//     { key: "mynumber", name: "CCCD/CMT" },
//     { key: "role", name: "Vai trò" },
//     { key: "other", name: "Khác" },
//   ];

//   const tableItems =
//     users &&
//     users.map((item) => ({
//       id: item.id,
//       username: item.username,
//       email: item.email,
//       phone: item.phoneNumber || "N/A",
//       mynumber: item.numberCard || "N/A",
//       role:
//         item.role.id === 3 ? (
//           item.role.name
//         ) : (
//           <Grid component="label" container alignItems="center" spacing={1}>
//             <Grid item>{item.role.name}</Grid>
//             <Grid item sx={{ marginLeft: "auto" }}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={item.role.id === 2}
//                     onChange={() => handleSwitchChange(item.id)}
//                   />
//                 }
//                 label=""
//               />
//             </Grid>
//           </Grid>
//         ),
//       other: (
//         <Button
//           variant="outlined"
//           onClick={() => handleButtonClick(item.id, item.role.id)}
//         >
//           Action
//         </Button>
//       ),
//     }));

//   return (
//     <Box
//       sx={{
//         display: "block",
//         height: "100vh",
//         marginTop: "65px",
//         flexGrow: 1,
//         backgroundColor: "customColorSchemes.bgColorPage",
//         padding: "50px 10px",
//       }}
//     >
//       <Box sx={{ padding: "0 15px" }}>
//         <TableControl header={tableHeader} itens={tableItems} />
//       </Box>
//     </Box>
//   );
// };

// export default HomeAdmin;
