import { Box, Button, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {findAllUser, lockAccount, openAccount} from "../../services/adminService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowAccountUser = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => {
        return state.admin.listUser;
    });

    const handleBlockUsers = (id) => {
        dispatch(lockAccount(id))
            .then(() => {
                toast.success("Block thành công");
                // Nạp lại danh sách user sau khi block thành công
                dispatch(findAllUser());
            })
            .catch(() => {
                toast.error("Block không thành công");
            });
    };



    const handleOpenUsers = (id) => {
        dispatch(openAccount(id))
            .then(() => {
                toast.success("Open thành công");
                // Nạp lại danh sách user sau khi block thành công
                dispatch(findAllUser());
            })
            .catch(() => {
                toast.error("Open không thành công");
            });
    };

    useEffect(() => {
        dispatch(findAllUser());
    }, [dispatch]);

    return (
        <>
            <Toolbar />
            <Box>
                {users &&
                    users.map((item) => (
                        <div key={item.id}>
                            <span> Tên tài khoản: {item.username}</span>
                            <Button onClick={() => handleBlockUsers(item.id)}>Block</Button>
                            <Button onClick={() => handleOpenUsers(item.id)}>Open</Button>

                        </div>
                    ))}
            </Box>
            <ToastContainer />
        </>
    );
};

export default ShowAccountUser;