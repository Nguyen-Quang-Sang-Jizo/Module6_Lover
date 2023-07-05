import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";
import bookingRouter from "./bookingRouter";
import typeRouter from "./typeRouter";
import evaluateRouter from "./evaluateRouter";
import serviceRouter from "./serviceRouter";
import messageRouter from "./messageRouter";
import conversationRouter from "./conversationRouter";
const hasPermissionsAdmin = require('../middleware/CheckRoleAdmin')
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')
const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/messages', messageRouter);
router.use('/admin', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsAdmin(req, res, next, );
    },adminRouter);
router.use('/services',serviceRouter)
router.use('/evaluate', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    },evaluateRouter)
router.use('/service-provider',serviceProviderRouter)
router.use('/bookings',bookingRouter)
router.use('/type',typeRouter)
router.use('/otp',otpRouter)
router.use('/conversation', conversationRouter)
export default router