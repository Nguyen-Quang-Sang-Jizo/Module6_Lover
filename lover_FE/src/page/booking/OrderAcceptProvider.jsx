import {Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptListBookingProvider} from "../../services/bookingService.js";
import "./booking.css";


const OrderAcceptProvider = () => {
    const dispatch = useDispatch();

    const acceptList = useSelector((state) => {
        return state.booking.booking;
    });

    useEffect( ()=>{
        dispatch(acceptListBookingProvider())
    },[dispatch])
    return(
        <>
            <Toolbar />
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Tên người thuê</th>
                    <th>Địa chỉ</th>
                    <th>Số giờ</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                </tr>
                {acceptList &&
                    acceptList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.user.username}</td>
                            <td>{item.address}</td>
                            <td>{item.hour}</td>
                            <td>{item.startTime}</td>
                            <td>{item.cost} VND</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default OrderAcceptProvider;
