import {Request, Response} from "express";
import bookingService from "../service/bookingService";
import providerService from "../service/ProviderService";

const jwt = require('jsonwebtoken');

class BookingController {

    save = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let provider = await providerService.one(id)
            let idProvider = provider.id
            let price = provider.price
            let cost = parseInt(price) * parseInt(req.body.hour)
            let booking = await bookingService.save(idProvider, req, cost)
            res.status(200).json({
                data: booking
            })
        } catch (e) {
            res.status(400).json({
                success: false,
                message: 'tao contract ko thanh cong'
            })
        }
    }

    all = async (req: Request, res: Response) => {
        let data = await bookingService.all()
        res.status(200).json({
            data: data
        })
    }

    find = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            const text = req.params.text
            let booking = await bookingService.find(text, decodedToken.idUser)
            res.status(200).json(booking)
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }


    findALlUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            console.log(id)
            let booking = await bookingService.findUser(id)
            console.log(booking)
            res.status(200).json(booking)
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }


    getDetail = async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let detail = await bookingService.detail(bookingId, decodedToken.idUser)
        res.status(200).json({
            data: detail
        })

    }


    findProvider = async (req, res) => {
        try {
            const text = req.params.text;

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            const loggedInUserId = decodedToken.idUser;
            const idProvider = await providerService.findOneProvider(loggedInUserId)
            const booking = await bookingService.findProvider(text, idProvider.id);

            res.status(200).json(booking);
        } catch (error) {
            // Handle any errors that occur during the process
            res.status(500).json({error: "Internal Server Error"});
        }
    };


    findAllProvider = async (req, res) => {
        try {
            let id = req.params.id
            const idProvider = await providerService.findOneProvider(id)
            const booking = await bookingService.findALlProvider(idProvider.id);
            res.status(200).json(booking);
        } catch (error) {
            // Handle any errors that occur during the process
            res.status(500).json({error: "Internal Server Error"});
        }
    };

    getDetailProvider = async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;
        let newBooking = await bookingService.showOne(bookingId);
        let idProvider = newBooking.providers.id;
        let detail = await bookingService.detailProvider(bookingId, idProvider)
        res.status(200).json({
            data: detail
        })

    }

    acceptBooking = async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;
        let newBooking = await bookingService.showOne(bookingId);
        let idProvider = newBooking.providers.id;
        const updatedBooking = await bookingService.acceptBooking(bookingId, idProvider);
        res.status(200).json({
            success: true,
            message: "Booking accepted",
            data: updatedBooking,
        });

    }

    rejectBooking = async (req: Request, res: Response) => {

        const bookingId = req.params.bookingId;
        let newBooking = await bookingService.showOne(bookingId);
        let idProvider = newBooking.providers.id;
        const updatedBooking = await bookingService.reject(bookingId, idProvider);
        res.status(200).json({
            success: true,
            message: "Booking rejected",
            data: updatedBooking,
        });

    }

    bookingDone = async (req: Request, res: Response) => {
        const bookingId = req.params.bookingId;
        let newBooking = await bookingService.showOne(bookingId);
        let idProvider = newBooking.providers.id;
        const updatedBooking = await bookingService.updateCountOnStatusChange(bookingId, idProvider);
        res.status(200).json({
            success: true,
            message: "Booking rejected",
            data: updatedBooking,
        });
    }
    totalCostByUserId = async (req: Request, res: Response)=>{
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let total = await bookingService.totalCostByUserId(decodedToken.idUser)
        res.status(200).json({
            success: true,
            data: total,
        });
    }

    totalCostByProviderId = async (req: Request, res: Response)=>{
        let idProvider= req.params.id
        let total = await bookingService.totalCostByProviderId(idProvider )
        res.status(200).json({
            success: true,
            data: total,
        });
    }

}

export default new BookingController()