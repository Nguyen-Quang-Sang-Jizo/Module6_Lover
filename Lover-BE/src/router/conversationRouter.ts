import {Router} from "express";
import conversationController from "../controllers/conversationController";
const passport = require('passport');


const conversationRouter = Router()
conversationRouter.post('/:id' ,passport.authenticate('jwt', { session: false, failWithError: true }),
    conversationController.addConversation);

conversationRouter.get('/' ,passport.authenticate('jwt', { session: false, failWithError: true }),
    conversationController.getConversation);
export default conversationRouter
