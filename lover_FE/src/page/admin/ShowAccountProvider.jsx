// import { Toolbar } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {findAllProvider, findAllUser, lockAccount, openAccount} from "../../services/adminService.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ShowAccountProvider = () => {
//     const dispatch = useDispatch();

//     const providers = useSelector((state) => {
//         return state.admin.listUser;
//     });

//     const handleBlockProvider = (id) => {
//         dispatch(lockAccount(id))
//             .then(() => {
//                 toast.success("Block thành công");
//                 // Nạp lại danh sách user sau khi block thành công
//                 dispatch(findAllProvider());
//             })
//             .catch(() => {
//                 toast.error("Block không thành công");
//             });
//     };

//     const handleOpenProvider = (id) => {
//         dispatch(openAccount(id))
//             .then(() => {
//                 toast.success("Open thành công");
//                 // Nạp lại danh sách user sau khi block thành công
//                 dispatch(findAllProvider());
//             })
//             .catch(() => {
//                 toast.error("Open không thành công");
//             });
//     }

//     useEffect(() => {
//         dispatch(findAllProvider());
//     }, [dispatch]);

//     return (
//         <>
//             <Toolbar />
//             <div>
//                 {providers &&
//                     providers.map((item) => (
//                         <div key={item.id}>
//                             <span> Tên tài khoản: {item.username}</span>
//                             <button onClick={() => handleBlockProvider(item.id)}>Block</button>
//                             <button onClick={() => handleOpenProvider(item.id)}>Open</button>
//                         </div>
//                     ))}
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

// export default ShowAccountProvider;