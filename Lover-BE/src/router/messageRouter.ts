import {Router} from "express";
import messageController from "../controllers/messageController";
const passport = require('passport');


const messageRouter = Router()
messageRouter.post('/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    messageController.addMessage);
    messageRouter.get('/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    messageController.getMessage);
export default messageRouter
