import {Button, Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptListBooking, doneBooking} from "../../services/bookingService.js";
import "./booking.css";

const OrderAccept = () => {
    const dispatch = useDispatch();
    const accept = useSelector((state) => {
        return state.booking.booking
    });

    const handleDone = async (id) => {
        await dispatch(doneBooking(id))
    }

    useEffect(() => {
        dispatch(acceptListBooking());
    }, [dispatch]);
    return (
        <>
            <Toolbar/>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                    </tr>
                    {accept &&
                        accept.map((item) => (
                            <tr key={item.id}>
                                <td>{item.address}</td>
                                <td>{item.hour}</td>
                                <td>{item.status}</td>
                                <td>{item.cost} VND</td>
                                <Button onClick={() => handleDone(item.id)}>Hoàn thành</Button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderAccept;
