import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toolbar, Dialog, DialogContent, Button } from "@mui/material";
import { detailBooking, rentalListBooking } from "../../services/bookingService.js";
import "./booking.css";

const Order = () => {
    const dispatch = useDispatch();
    const rental = useSelector((state) => state.booking.booking);
    const detailOrder = useSelector((state) => state.booking.detail.data);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDetailOrder = async (id) => {
        await dispatch(detailBooking(id));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(rentalListBooking());
    }, [dispatch]);

    return (
        <>
            <Toolbar />
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                    </tr>
                    {
                        rental?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.address}</td>
                                <td>{item.hour}</td>
                                <td>{item.status}</td>
                                <td>{item.cost} VND</td>
                                <Button onClick={() => handleDetailOrder(item.id)}>
                                    chi tiet don thue
                                </Button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogContent>
                    <h1> Chi tiết đơn thuê</h1>
                    {detailOrder && (
                        <>
                            <div>Tên (người yêu được thuê): {detailOrder.providers.name}</div>
                            <div>Địa chỉ: {detailOrder.address}</div>
                            <div>Thời gian thuê (bao nhiêu tiếng): {detailOrder.hour} giờ</div>
                            <div>Trạng thái: {detailOrder.status}</div>
                            <div>Tổng đơn: {detailOrder.cost} VND</div>
                            <Button>Hoàn thành</Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Order;
