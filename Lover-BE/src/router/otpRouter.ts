import {Router} from "express";
import mailController from "../controllers/mailController";

const otpRouter = Router()

otpRouter.post('/', mailController.sendOtp);


export default otpRouter
