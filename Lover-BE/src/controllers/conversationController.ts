import { Conversation } from './../entity/Conversation';
import {Request, Response} from "express";
import conversationService from "../service/conversationService";
const jwt = require('jsonwebtoken')


class ConversationController {
    private conversationService
    constructor() {
        this.conversationService = conversationService
    }
    getConversation = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let userId = decodedToken.idUser
        const message = await conversationService.showAll(userId);
        if (!message) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(message);
    }
    addConversation =async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let user1 = decodedToken.idUser
        let user2 = req.params.id
        let check = await conversationService.check(user1,user2)
        if(check == true){
            let newConversation = await conversationService.addConversation(user1, user2) 
            res.status(200).json({
            success: true,
            data: newConversation
            })
        }else if(check == false){
            res.status(401).json({
                message: 'đã tồn tại',
                success: false,
         });
        }
    }
}
export default new ConversationController();